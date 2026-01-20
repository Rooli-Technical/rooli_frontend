import { useAppStore } from "@/store/app-store";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const isTokenExpiredOrExpiringSoon = (
  token: string,
  bufferMinutes: number = 2,
): boolean => {
  try {
    if (!token || token.split(".").length !== 3) {
      return true;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));

    if (!payload.exp) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const bufferTime = bufferMinutes * 60;

    return payload.exp < currentTime + bufferTime;
  } catch (error) {
    console.error("Error parsing JWT token:", error);
    return true;
  }
};

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;
let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 2;

interface QueuedRequest {
  resolve: (value: any) => void;
  reject: (error: any) => void;
  config: AxiosRequestConfig;
}

let failedQueue: QueuedRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
  const queue = [...failedQueue];
  failedQueue = [];

  queue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
    } else {
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      resolve(config);
    }
  });
};

const refreshAccessToken = async (): Promise<string> => {
  if (isRefreshing && refreshPromise) {
    console.log("Refresh already in progress, returning existing promise");
    return refreshPromise;
  }

  if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
    console.error("Max refresh attempts exceeded, forcing logout");
    refreshAttempts = 0;
    handleAuthError();
    throw new Error("Max refresh attempts exceeded");
  }

  isRefreshing = true;
  refreshAttempts++;

  console.log(`Starting token refresh attempt ${refreshAttempts}`);

  refreshPromise = axios
    .get(`${BASE_URL}/auth/refresh`, {
      withCredentials: true,
      timeout: 10000,
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    })
    .then((res) => {
      console.log("Token refresh successful");
      isRefreshing = false;
      refreshPromise = null;
      refreshAttempts = 0;

      if (!res.data?.access_token) {
        throw new Error("No access token in refresh response");
      }

      return res.data.access_token;
    })
    .catch((error) => {
      console.error(
        `Token refresh attempt ${refreshAttempts} failed:`,
        error?.response?.status,
        error?.message,
      );
      isRefreshing = false;
      refreshPromise = null;

      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log("Refresh token invalid, forcing logout");
        refreshAttempts = MAX_REFRESH_ATTEMPTS;
        handleAuthError();
      } else if (error.code === "ECONNABORTED") {
        console.log("Refresh request timed out");
      } else if (error.code === "NETWORK_ERROR" || !error.response) {
        console.log("Network error during refresh");

        refreshAttempts = Math.max(0, refreshAttempts - 1);
      }

      throw error;
    });

  return refreshPromise;
};

const handleAuthError = () => {
  console.log(
    "Handling authentication error - clearing tokens and redirecting",
  );

  const path = window.location.pathname;
  console.log("🚀 ~ file: axios-instance.ts:132 ~ path:", path);

  const { setAccessToken } = useAppStore.getState();
  setAccessToken(null);

  isRefreshing = false;
  refreshPromise = null;
  refreshAttempts = 0;

  processQueue(new Error("Authentication failed"), null);

  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");

    if (path === "/" || path === "") {
      return;
    }

    setTimeout(() => {
      window.location.href = "/auth/login";
    }, 100);
  }
};

const axiosInstance = (withAuth: boolean = false) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (withAuth) {
    instance.interceptors.request.use(
      async (config) => {
        const { accessToken, setAccessToken } = useAppStore.getState();

        if (!accessToken) {
          console.log("No access token available for request");
          return config;
        }

        if (isTokenExpiredOrExpiringSoon(accessToken)) {
          console.log("Token expired or expiring soon, attempting refresh");

          if (isRefreshing) {
            console.log("Refresh in progress, queuing request");
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject, config });
            });
          }

          try {
            const newAccessToken = await refreshAccessToken();
            setAccessToken(newAccessToken);

            if (config.headers) {
              config.headers.Authorization = `Bearer ${newAccessToken}`;
            }

            console.log(
              "Token refreshed successfully, proceeding with request",
            );
          } catch (error) {
            console.error("Proactive token refresh failed:", error);

            return Promise.reject(new Error("Token refresh failed"));
          }
        } else {
          if (config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        }

        return config;
      },
      (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
      },
    );

    instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        console.log(
          "Response interceptor caught error:",
          error.response?.status,
          error.message,
        );

        if (
          error.response?.status === 401 &&
          originalRequest &&
          !originalRequest._retry
        ) {
          console.log("401 error detected, attempting token refresh");
          originalRequest._retry = true;

          if (isRefreshing) {
            console.log("Refresh in progress, queuing failed request");
            return new Promise((resolve, reject) => {
              failedQueue.push({
                resolve: (config) => resolve(instance(config)),
                reject,
                config: originalRequest,
              });
            });
          }

          try {
            const newAccessToken = await refreshAccessToken();
            const { setAccessToken } = useAppStore.getState();
            setAccessToken(newAccessToken);

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            }

            processQueue(null, newAccessToken);

            console.log("Retrying original request with new token");
            return instance(originalRequest);
          } catch (refreshError: any) {
            console.error("Reactive token refresh failed:", refreshError);

            processQueue(refreshError, null);

            if (
              refreshError.message !== "Max refresh attempts exceeded" &&
              refreshError.response?.status !== 401 &&
              refreshError.response?.status !== 403
            ) {
              handleAuthError();
            }

            return Promise.reject(refreshError);
          }
        }

        // if (error.response?.status === 403) {
        //   handleAuthError();
        // }

        return Promise.reject(error);
      },
    );
  }

  return instance;
};

export default axiosInstance;
