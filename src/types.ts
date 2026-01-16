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
  platform: string;
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
