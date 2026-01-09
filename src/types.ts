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
  connected: boolean;
  username: string;
  followers: string;
  id: string;
};
