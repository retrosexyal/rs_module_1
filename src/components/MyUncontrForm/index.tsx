import React, { useRef, useState } from "react";
import * as yup from "yup";

import { useAppDispatch } from "../../hooks/redux";
import { setFormValues } from "../../store/slices/formSlice";
import { IFormValues } from "../../interface";

import styles from "./myUncontrForm.module.scss";
import {
  validateAge,
  validateEmail,
  validateName,
  validatePassword,
} from "../../helpers/validations";
import { useNavigate } from "react-router-dom";
import { countries } from "../../constants/coutries";
import { validationSchema } from "../../helpers/yap";

export const MyUncontrForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [img, setImg] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImg(base64String);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: IFormValues = {
      name:
        (e.currentTarget.elements.namedItem("name") as HTMLInputElement)
          ?.value || "",
      age:
        (e.currentTarget.elements.namedItem("age") as HTMLInputElement)
          ?.value || "",
      email:
        (e.currentTarget.elements.namedItem("email") as HTMLInputElement)
          ?.value || "",
      password:
        (e.currentTarget.elements.namedItem("password") as HTMLInputElement)
          ?.value || "",
      confirmPassword:
        (
          e.currentTarget.elements.namedItem(
            "confirmPassword",
          ) as HTMLInputElement
        )?.value || "",
      gender:
        (e.currentTarget.elements.namedItem("gender") as HTMLSelectElement)
          ?.value || "",
      acceptTerms:
        (e.currentTarget.elements.namedItem("acceptTerms") as HTMLInputElement)
          ?.checked || false,
      picture: img,
      country:
        (e.currentTarget.elements.namedItem("country") as HTMLSelectElement)
          ?.value || "",
    };

    setValidationErrors({
      name: validateName(formData.name) || "",
      age: validateAge(formData.age) || "",
      email: validateEmail(formData.email) || "",
      password:
        validatePassword(formData.password, formData.confirmPassword) || "",
    });
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        setValidationErrors({});
        dispatch(setFormValues(formData));
        navigate("/");
      })
      .catch((err) => {
        const errors: Record<string, string> = {};
        err.inner.forEach((error: yup.ValidationError) => {
          errors[error.path as string] = error.message;
        });
        setValidationErrors(errors);
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="age">Age:</label>
      <input type="text" id="age" name="age" />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" />

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" name="confirmPassword" />

      <label htmlFor="gender">Gender:</label>
      <select id="gender" name="gender">
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <label htmlFor="acceptTerms">
        <input type="checkbox" id="acceptTerms" name="acceptTerms" />
        Accept Terms and Conditions
      </label>

      <label htmlFor="picture">Upload Picture:</label>
      <input
        type="file"
        id="picture"
        name="picture"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <label htmlFor="country">Country:</label>
      <select id="country" name="country">
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      {Object.values(validationErrors).map((error, index) => (
        <p key={index} className={styles.errorText}>
          {error}
        </p>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};
