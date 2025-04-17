export interface LoginSuccessPayload {
  access_token: string;
}

export interface RegisterSuccessPayload {
  user: User;
}

export type AuthenticatedUser = User & { role: UserRole };

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  statusCode: number;
  message: string;
}

export type UserRole = "USER" | "ADMIN";

export type BaseEntity = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type User = Omit<BaseEntity, "createdAt"> & {
  name: string;
  email: string;
  password: string;
};
