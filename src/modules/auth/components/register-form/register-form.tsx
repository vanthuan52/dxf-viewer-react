import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FormInput } from "../form-input/form-input";
import { RegisterFormType, registerSchema } from "../../schemas/authSchema";
import AuthCard from "../auth-card/auth-card";
import { useAppDispatch, useAppSelector } from "@/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authActions } from "../../store/auth-slice";
import styles from "./register-form.module.scss";
import Button from "../button/button";

const RegisterForm: React.FC = () => {
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    defaultValues: {
      name: "Admin",
      email: "admin@example.com",
      password: "Abc@12345",
    },
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(authActions.clearAuthError()); // Xóa lỗi khi component unmount
      }
    };
  }, [dispatch, error]);

  const onSubmit: SubmitHandler<RegisterFormType> = (data) => {
    if (!isLoading) {
      dispatch(authActions.registerRequest(data));
    }
  };

  return (
    <AuthCard>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.title}>Sign up</h2>

        {error && <p className={styles.apiError}>{error}</p>}

        <FormInput<RegisterFormType>
          name="name"
          label="Name"
          type="text"
          placeholder="Enter your name"
          register={register}
          error={errors.name}
          required
        />

        <FormInput<RegisterFormType>
          name="email"
          label="Email"
          type="email"
          placeholder="joe@email.com"
          register={register}
          error={errors.email}
          required
        />

        <FormInput<RegisterFormType>
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          register={register}
          error={errors.password}
          required
          containerClassName={styles.lastInputGroup}
        />

        <Button type="submit" isLoading={isLoading} variant="primary">
          Sign up
        </Button>

        <p className={styles.switchAuth}>
          Already have an account?{" "}
          <Link to="/sign-in" className={styles.switchAuthLink}>
            Login here.
          </Link>
        </p>
      </form>
    </AuthCard>
  );
};

export default RegisterForm;
