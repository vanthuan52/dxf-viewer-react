import React from "react";
import { UseFormRegister, FieldError, Path } from "react-hook-form";
import styles from "./form-input.module.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldValues = Record<string, any>;

interface FormInputProps<TFormValues extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<TFormValues>;
  label: string;
  register: UseFormRegister<TFormValues>;
  error?: FieldError;
  containerClassName?: string; // Class cho div bao ngoài
}

export const FormInput = <TFormValues extends FieldValues>({
  name,
  label,
  register,
  error,
  type = "text",
  containerClassName,
  className, // Class cho thẻ input
  ...props
}: FormInputProps<TFormValues>) => {
  return (
    <div className={`${styles.formGroup} ${containerClassName}`}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        // Áp dụng class input và class lỗi nếu có
        className={`${styles.input} ${
          error ? styles.inputError : ""
        } ${className}`}
        aria-invalid={error ? "true" : "false"}
        {...register(name)}
        {...props}
      />
      {error && (
        <span role="alert" className={styles.errorMessage}>
          {error.message}
        </span>
      )}
    </div>
  );
};
