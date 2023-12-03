import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[A-Z]/, "Should start with an uppercase letter"),
  age: yup
    .string()
    .test("is-positive", "Age should be a positive number", (value) => {
      const parsedValue = parseInt(value!, 10);
      return !isNaN(parsedValue) && parsedValue > 0;
    })
    .test("is-integer", "Age should be an integer", (value) => {
      const parsedValue = parseInt(value!, 10);
      return !isNaN(parsedValue) && parsedValue === parseFloat(value!);
    })
    .required("Age is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      "Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character",
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match"),
  gender: yup.string().required("Gender is required"),
  acceptTerms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
  country: yup.string().required("Country is required"),
  picture: yup.mixed(),
  /* .test(
      "fileFormat",
      "Invalid file format. Only PNG or JPEG is allowed.",
      (value) => {
        if (!value) return true;
        const supportedFormats = ["image/png", "image/jpeg"];

        const fileValue = value as File;
        console.log(fileValue);
        return supportedFormats.includes(fileValue.type);
      },
    ), */
});
