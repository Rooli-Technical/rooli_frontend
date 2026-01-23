export type RegisterPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type UserType = {
  avatar: string | null;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  timezone: string;
  lastActiveAt: string | null;
  id: string;
  isEmailVerified: boolean;
};

export type CompleteOnboardingPayload = {
  name: string;
  timezone: string;
  email: string;
  planId: string;
  userType: string;
  initialWorkspaceName?: string;
};

export type SocialAccountProps = {
  platform: "LINKEDIN" | "INSTAGRAM" | "TWITTER" | "FACEBOOK";
  isActive: boolean;
  username: string;
  id: string;
  followerCount?: number;
  picture: string | null;
  name: string;
};

export type CreateWorkspacePayload = {
  name: string;
  clientName: string;
  clientStatus: string;
  clientContact: string;
  clientColor: string;
};

export type UploadedFileType = {
  id: string;
  workspaceId: string;
  userId: string;
  folderId: string | null;
  filename: string;
  originalName: string;
  mimeType: string;
  size: string;
  url: string;
  publicId: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  duration: number | null;
  isAiGenerated: boolean;
  aiProvider: string | null;
  aiPrompt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreatePostPayload = {
  content: string;
  contentType: "POST" | "REEL" | "STORY" | "THREAD";
  socialProfileIds: string[];
  mediaIds?: string[];
  timezone: string;
  scheduledAt: string;
  isAutoSchedule?: boolean;
  campaignId?: string;
  labelIds?: string[];
  needsApproval?: boolean;
  overrides?: {
    socialProfileId: string;
    content: string;
  }[];
  threads?: {
    content: string;
    mediaIds?: string[];
    targetProfileIds?: string[];
  }[];
};
