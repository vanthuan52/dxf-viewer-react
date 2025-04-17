import { useAppSelector } from "@/store";
import React from "react";
import { Navigate } from "react-router-dom";
import AuthLayout from "../../layouts/auth-layout/auth-layout";
import RegisterForm from "../../components/register-form/register-form";

const RegisterPage: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
