export type RegisterPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};
