export type RegisterPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
  timezone: string;
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
