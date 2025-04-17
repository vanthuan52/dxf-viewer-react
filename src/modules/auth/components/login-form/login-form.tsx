import React, { useCallback, useEffect } from "react";
import AuthCard from "../../components/auth-card/auth-card";
import { LoginFormType, loginSchema } from "../../schemas/authSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authActions } from "../../store/auth-slice";
import { Link } from "react-router-dom";
import Button from "../../components/button/button";
import styles from "./login-form.module.scss";
import { useAppDispatch, useAppSelector } from "@/store";
import { FormInput } from "../form-input/form-input";

const LoginForm: React.FC = () => {
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues: {
      email: "admin@example.com",
      password: "Abc@12345",
    },
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(authActions.clearAuthError()); // Xóa lỗi khi component unmount
      }
    };
  }, [dispatch, error]);

  const onSubmit: SubmitHandler<LoginFormType> = useCallback(
    (data) => {
      if (!isLoading) {
        dispatch(authActions.loginRequest(data));
      }
    },
    [dispatch, isLoading]
  );

  return (
    <AuthCard>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.title}>Log in</h2>

        {error && <p className={styles.apiError}>{error}</p>}

        <FormInput<LoginFormType>
          name="email"
          label="Email"
          type="email"
          placeholder="joe@email.com"
          register={register}
          error={errors.email}
          required
        />

        <FormInput<LoginFormType>
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          register={register}
          error={errors.password}
          required
          containerClassName={styles.passwordInputGroup}
        />

        <Link to="/forgot-password" className={styles.forgotPassword}>
          Forgot password?
        </Link>

        <Button type="submit" isLoading={isLoading} variant="primary">
          Log in
        </Button>

        <p className={styles.switchAuth}>
          Don't have an account?{" "}
          <Link to="/sign-up" className={styles.switchAuthLink}>
            Register here.
          </Link>
        </p>
      </form>
    </AuthCard>
  );
};

export default LoginForm;
