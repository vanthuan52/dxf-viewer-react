import * as yup from "yup";
import { InferType } from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export type LoginFormType = InferType<typeof loginSchema>;

export const registerSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export type RegisterFormType = InferType<typeof registerSchema>;
