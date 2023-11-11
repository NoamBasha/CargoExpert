import * as yup from "yup";

export const registerSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters")
        .max(20, "Name must not exceed 20 characters"),
    email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format")
        .max(36, "Email must not exceed 36 characters"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must not exceed 20 characters"),
});

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format")
        .max(36, "Email must not exceed 36 characters"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must not exceed 20 characters"),
});
