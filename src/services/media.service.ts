import axiosInstance from "./axios-instance";

class MediaService {
  async uploadSingleMedia(workSpaceId: string, file: File, folderId: string) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderId", folderId);

    const response = await axiosInstance(true).post(
      `/workspaces/${workSpaceId}/media/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async uploadMultipleMedia(
    workSpaceId: string,
    files: File[],
    folderId: string,
  ) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("folderId", folderId);

    const response = await axiosInstance(true).post(
      `/workspaces/${workSpaceId}/media/upload/multiple`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async deleteMedia(workSpaceId: string, fileId: string) {
    const response = await axiosInstance(true).delete(
      `/workspaces/${workSpaceId}/media/${fileId}`,
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  //FOR ONLY ROCKET PLAN
  async createFolder(
    workSpaceId: string,
    payload: { name: string; parentId: string },
  ) {
    const response = await axiosInstance(true).post(
      `/workspaces/${workSpaceId}/media/folders`,
      payload,
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }
}

const mediaService = new MediaService();

export default mediaService;
