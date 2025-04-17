import { useAppSelector } from "@/store";
import React from "react";
import { Navigate } from "react-router-dom";
import AuthLayout from "../../layouts/auth-layout/auth-layout";
import LoginForm from "../../components/login-form/login-form";

const LoginPage: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
