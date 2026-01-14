import {
  CompleteOnboardingPayload,
  LoginPayload,
  RegisterPayload,
} from "@/types";
import axiosInstance from "./axios-instance";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const GOOGLE_ID = process.env.NEXT_PUBLIC_ROOLI_GOOGLE_ID;
const GOOGLE_CALLBACK_URL = process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL;

class AuthService {
  async registerUser(payload: RegisterPayload) {
    const response = await axiosInstance(false).post("/auth/register", payload);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async loginUser(payload: LoginPayload) {
    const response = await axiosInstance(false).post("/auth/login", payload);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async googleAuthUser() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const options = {
      client_id: GOOGLE_ID || "",
      redirect_uri: GOOGLE_CALLBACK_URL || "",
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent",
    };

    const qs = new URLSearchParams(options);

    window.location.href = `${rootUrl}?${qs.toString()}`;
  }

  async logoutUser() {
    const response = await axiosInstance(true).post("/auth/logout");

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async verifyNewUserEmail(token: string) {
    const response = await axiosInstance(false).post(
      `/auth/verify-email?token=${token}`
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async resendVerificationEmail(payload: { email: string }) {
    const response = await axiosInstance(false).post(
      `/auth/resend-verification`,
      payload
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async requestPasswordReset(payload: { email: string }) {
    const response = await axiosInstance(false).post(
      `/auth/forgot-password`,
      payload
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async resetPassword(payload: { password: string; token: string }) {
    const response = await axiosInstance(false).post(
      `/auth/reset-password`,
      payload
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async getUserProfile() {
    const response = await axiosInstance(true).get("/auth/profile");

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async completeOnboarding(payload: CompleteOnboardingPayload) {
    const response = await axiosInstance(true).post(
      "/auth/onboarding",
      payload
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }
}

const authService = new AuthService();

export default authService;
