import axiosInstance from "./axios-instance";

class WorkSpaceService {
  async getWorkSpaceSocials(workspaceId: string) {
    const response = await axiosInstance(true).get(
      `/workspaces/${workspaceId}/social-profiles`
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
      `/social-connections/auth-url?${queries.toString()}`
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }
}

const workSpaceService = new WorkSpaceService();
export default workSpaceService;
