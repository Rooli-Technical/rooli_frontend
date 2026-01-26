import { CreatePostPayload } from "@/types";
import axiosInstance from "./axios-instance";

class PostService {
  async createWorkspacePost(workspaceId: string, payload: CreatePostPayload) {
    const response = await axiosInstance(true).post(
      `/workspaces/${workspaceId}/posts`,
      payload,
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async getWorkspacePosts(
    workspaceId: string,
    payload: {
      page?: number;
      limit?: number;
      status?:
        | "DRAFT"
        | "SCHEDULED"
        | "PUBLISHED"
        | "PENDING_APPROVAL"
        | "PUBLISHING"
        | "FAILED";
      contentType?: "POST" | "REEL" | "STORY" | "THREAD";
      search?: string;
    },
  ) {
    const params = new URLSearchParams({});

    if (payload.page) params.set("page", payload.page.toString());
    if (payload.limit) params.set("limit", payload.limit.toString());
    if (payload.status) params.set("status", payload.status);
    if (payload.contentType) params.set("contentType", payload.contentType);
    if (payload.search) params.set("search", payload.search);

    const response = await axiosInstance(true).get(
      `/workspaces/${workspaceId}/posts?${params.toString()}`,
    );

    if (response.status === 200) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async getPostById(workSpaceId: string, postId: string) {
    const response = await axiosInstance(true).get(
      `/workspaces/${workSpaceId}/posts/${postId}`,
    );

    if (response.status === 200) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async deletePost(workspaceId: string, postId: string) {
    const response = await axiosInstance(true).delete(
      `/workspaces/${workspaceId}/posts/${postId}`,
    );

    if (response.status === 200) {
      return response.data;
    }

    throw new Error(response.data.message);
  }
}

const postService = new PostService();
export default postService;
