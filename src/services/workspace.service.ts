import { CreateWorkspacePayload } from "@/types";
import axiosInstance from "./axios-instance";

class WorkSpaceService {
  async getAllOrganizationWorkspaces(orgId: string) {
    const response = await axiosInstance(true).get(
      `/organizations/${orgId}/workspaces/orgId`,
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async createWorkspace(orgId: string, payload: CreateWorkspacePayload) {
    const response = await axiosInstance(true).post(
      `/organizations/${orgId}/workspaces/orgId`,
      payload,
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async getWorkSpaceById(orgId: string, workSpaceId: string) {
    const response = await axiosInstance(true).get(
      `/organizations/${orgId}/workspaces/${workSpaceId}`,
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async getWorkSpaceSocials(workspaceId: string) {
    const response = await axiosInstance(true).get(
      `/workspaces/${workspaceId}/social-profiles`,
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async connectSocialAccount(payload: {
    platform: string;
    organizationId: string;
  }) {
    const queries = new URLSearchParams();
    queries.set("platform", payload.platform);
    queries.set("organizationId", payload.organizationId);

    const response = await axiosInstance(true).get(
      `/social-connections/auth-url?${queries.toString()}`,
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async connectedSocialsVerification(payload: {
    platform: "TWITTER" | "INSTAGRAM" | "FACEBOOK" | "LINKEDIN";
    data: {
      code?: string;
      state?: string;
      oauth_token?: string;
      oauth_verifier?: string;
    };
  }) {
    const queries = new URLSearchParams();

    if (payload.data?.code) {
      queries.set("code", payload.data.code);
    }

    if (payload.data?.state) {
      queries.set("state", payload.data.state);
    }

    if (payload.data?.oauth_token) {
      queries.set("oauth_token", payload.data.oauth_token);
    }

    if (payload.data?.oauth_verifier) {
      queries.set("oauth_verifier", payload.data.oauth_verifier);
    }

    const response = await axiosInstance(true).get(
      `/social-connections/callback/${payload.platform}?${queries.toString()}`,
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async addBulkSocialAccounts(
    workspaceId: string,
    payload: {
      connectionId: string;
      platform: "TWITTER" | "INSTAGRAM" | "FACEBOOK" | "LINKEDIN";
      platformIds: string[];
    },
  ) {
    const response = await axiosInstance(true).post(
      `/workspaces/${workspaceId}/social-profiles`,
      payload,
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async disconnectSocialAccount(organizationId: string, connectionId: string) {
    const queries = new URLSearchParams();
    if (organizationId) {
      queries.set("organizationId", organizationId);
    }

    const response = await axiosInstance(true).delete(
      `/social-connections/${connectionId}?${queries.toString()}`,
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async switchWorkSpace(payload: { orgId: string; workSpaceId: string }) {
    const response = await axiosInstance(true).post(
      `/organizations/${payload.orgId}/workspaces/${payload.workSpaceId}/switch`,
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async getWorkspaceSocialProfiles(workspaceId: string) {
    const response = await axiosInstance(true).get(
      `/workspaces/${workspaceId}/social-profiles`,
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }
}

const workSpaceService = new WorkSpaceService();
export default workSpaceService;
