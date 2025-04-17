import axios from "../../../lib/axios";
import { LoginFormType, RegisterFormType } from "../schemas/authSchema";
import {
  ApiResponse,
  LoginSuccessPayload,
  RegisterSuccessPayload,
  ApiError,
  User,
} from "../types";

const MOCK_API = true;
const MOCK_DELAY = 1000;

const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Test User",
    email: "admin@example.com",
    password: "Abc@12345",
    updatedAt: new Date().toISOString(),
  },
];

const mockLogin = (
  dataLogin: LoginFormType
): Promise<ApiResponse<LoginSuccessPayload>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const foundUser = mockUsers.find(
        (user) =>
          user.email === dataLogin.email && user.password === dataLogin.password
      );

      if (foundUser) {
        const response: ApiResponse<LoginSuccessPayload> = {
          status: true,
          message: "Mock Login Successful!",
          data: {
            access_token: `mock_token_${Date.now()}`,
          },
        };
        resolve(response);
      } else {
        const error: ApiError = {
          statusCode: 401,
          message: "Invalid mock email or password",
        };
        reject(error);
      }
    }, MOCK_DELAY);
  });
};

const mockRegister = (
  dataRegister: RegisterFormType
): Promise<ApiResponse<RegisterSuccessPayload>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const emailExists = mockUsers.some(
        (user) => user.email === dataRegister.email
      );

      if (emailExists) {
        const error: ApiError = {
          statusCode: 400,
          message: "Mock email already exists",
        };
        reject(error);
      } else {
        const newUser: User = {
          id: `mock-user-${Date.now()}`,
          name: dataRegister.name,
          email: dataRegister.email,
          password: "hashed_mock_password",
          updatedAt: new Date().toISOString(),
        };

        const response: ApiResponse<RegisterSuccessPayload> = {
          status: true,
          message: "Mock Registration Successful!",
          data: {
            user: newUser,
          },
        };
        resolve(response);
      }
    }, MOCK_DELAY);
  });
};

const login = async (
  dataLogin: LoginFormType
): Promise<ApiResponse<LoginSuccessPayload>> => {
  if (!dataLogin) return Promise.reject({ message: "Login data is required" });

  if (MOCK_API) {
    return mockLogin(dataLogin);
  } else {
    const response = await axios.post<ApiResponse<LoginSuccessPayload>>(
      "/auth/signin",
      dataLogin
    );
    return response.data;
  }
};

const register = async (
  dataRegister: RegisterFormType
): Promise<ApiResponse<RegisterSuccessPayload>> => {
  if (!dataRegister)
    return Promise.reject({ message: "Register data is required" });

  if (MOCK_API) {
    return mockRegister(dataRegister);
  } else {
    const response = await axios.post<ApiResponse<RegisterSuccessPayload>>(
      "/auth/signup",
      dataRegister
    );
    return response.data;
  }
};

const authApi = {
  login,
  register,
};

export default authApi;
