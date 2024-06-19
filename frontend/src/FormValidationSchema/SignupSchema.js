import * as Yup from 'yup'


const validationSchema = Yup.object({
    employeeId: Yup.string().required("First Name is Required"),
    userName: Yup.string().required("User Name is Required"),
    emailAddress: Yup.string()
        .required("Email is Required")
        .email("Invalid email format"),
    mobileNumber: Yup.string()
        .matches(/^\d{10}$/, "Phone Number must be 10 digits")
        .required(),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one symbol"
        )
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Oops... Password not match")
        .required("Confirm password is required"),
})

export default validationSchema;