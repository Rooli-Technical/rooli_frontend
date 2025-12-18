import { LoginPayload, RegisterPayload } from "@/types";
import axiosInstance from "./axios-instance";

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

    if (response.status === 200) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async verifyNewUserEmail(token: string) {
    const response = await axiosInstance(false).post(
      `/auth/verify-email?token=${token}`
    );

    if (response.status === 200) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async resendVerificationEmail(payload: { email: string }) {
    const response = await axiosInstance(false).post(
      `/auth/resend-verification`,
      payload
    );

    if (response.status === 200) {
      return response.data;
    }

    throw new Error(response.data.message);
  }
}

const authService = new AuthService();

export default authService;
