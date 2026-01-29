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

export type SocialPlatforms = "LINKEDIN" | "INSTAGRAM" | "TWITTER" | "FACEBOOK";

export type PostType = {
  id: string;
  workspaceId: string;
  userId: string;
  authorId: string;
  author: { email: string; firstName: string };
  childPosts: any[];
  content: string;
  destinations: DestinationType[];
  media: MediaType[];
  contentType: ContentType;
  parentPost: any;
  publishedAt: string | null;
  scheduledAt: string | null;
  status: string;
};

export type DestinationType = {
  id: string;
  contentOverride: string;
  postId: string;
  profile: { id: string; name: string; platform: SocialPlatforms };
};

export type MediaType = {
  id: string;
  mediaFile: { id: string; url: string; mimeType: string };
  order: number;
};

export type ContentType = "POST" | "REEL" | "STORY" | "THREAD";

export type DestinationThreadType = {
  contentOverride: string;
  id: string;
  metadata: any;
  postId: string;
  profile: {
    id: string;
    name: string;
    platform: SocialPlatforms;
    type: string;
    picture: string;
  };
  thread: {
    content: string;
    mediaIds: string[];
    targetProfileIds: string[];
  }[];
};
