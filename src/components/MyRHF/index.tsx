import React, { useRef, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch } from "../../hooks/redux";
import { IFormValues } from "../../interface";

import { countries } from "../../constants/coutries";
import { validationSchema } from "../../helpers/yap";
import styles from "./myRHF.module.scss";
import { useNavigate } from "react-router-dom";
import { setRHFValues } from "../../store/slices/rhfSlice";

export const MyRHF: React.FC = () => {
  const [img, setImg] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<IFormValues> = async (formData) => {
    try {
      dispatch(setRHFValues({ ...formData, picture: img }));
      navigate("/");
      console.log(formData);
    } catch (err) {
      console.log(err);
    }
  };
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
      <label htmlFor="name">Name:</label>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <input type="text" id="name" {...field} />
            {fieldState.error && (
              <p className={styles.errorText}>{fieldState.error.message}</p>
            )}
          </>
        )}
      />

      <label htmlFor="age">Age:</label>
      <Controller
        name="age"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <input type="text" id="age" {...field} />
            {fieldState.error && (
              <p className={styles.errorText}>{fieldState.error.message}</p>
            )}
          </>
        )}
      />

      <label htmlFor="email">Email:</label>
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <input type="email" id="email" {...field} />
            {fieldState.error && (
              <p className={styles.errorText}>{fieldState.error.message}</p>
            )}
          </>
        )}
      />

      <label htmlFor="password">Password:</label>
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <input type="password" id="password" {...field} />
            {fieldState.error && (
              <p className={styles.errorText}>{fieldState.error.message}</p>
            )}
          </>
        )}
      />

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <input type="password" id="confirmPassword" {...field} />
            {fieldState.error && (
              <p className={styles.errorText}>{fieldState.error.message}</p>
            )}
          </>
        )}
      />

      <label htmlFor="gender">Gender:</label>
      <Controller
        name="gender"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <select id="gender" {...field}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {fieldState.error && (
              <p className={styles.errorText}>{fieldState.error.message}</p>
            )}
          </>
        )}
      />

      <label htmlFor="acceptTerms">
        <Controller
          name="acceptTerms"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <input
                type="checkbox"
                id="acceptTerms"
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                checked={field.value || false}
              />
              Accept Terms and Conditions
              {fieldState.error && (
                <p className={styles.errorText}>{fieldState.error.message}</p>
              )}
            </>
          )}
        />
      </label>

      <label htmlFor="picture">Upload Picture:</label>
      <input
        type="file"
        id="picture"
        name="picture"
        onChange={handleFileChange}
      />

      <label htmlFor="country">Country:</label>
      <Controller
        name="country"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <select id="country" {...field}>
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {fieldState.error && (
              <p className={styles.errorText}>{fieldState.error.message}</p>
            )}
          </>
        )}
      />

      <button type="submit">Submit</button>
    </form>
  );
};
