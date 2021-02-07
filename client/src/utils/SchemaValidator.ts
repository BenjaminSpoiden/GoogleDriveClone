import * as yup from "yup"

export const SignupValidationSchema = yup.object().shape({
    email: yup.string().email("Invalid email.").required("The email is required."),
    password: yup.string().min(8, "The password must be atleast 8 characters long.").required("The password is required."),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords did not match.").required("Confirm password is required")
})

export const LoginValidationSchema = yup.object().shape({
    email: yup.string().email("Invalid email.").required("The email is required."),
    password: yup.string().min(8, "The password must be atleast 8 characters.").required("The Password is required")
})

export const ResetPasswordValidationSchema = yup.object().shape({
    email: yup.string().email("Invalid email.").required("The email is required")
})

export const ChangePasswordValidationSchema = yup.object().shape({
    password: yup.string().min(8, "The password must be atleast 8 characters").required("The password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords did not match.").required("Confirm password is required")
})