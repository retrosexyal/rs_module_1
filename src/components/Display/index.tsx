import { useAppSelector } from "../../hooks/redux";
import { DisplayItem } from "../DisplayItem";
import { DisplayPicture } from "../DisplayPicture";
import styles from "./display.module.scss";

export const Display = () => {
  const {
    name,
    age,
    email,
    password,
    confirmPassword,
    gender,
    acceptTerms,
    picture,
    country,
  } = useAppSelector((state) => state.form);
  const {
    name: rhfName,
    age: rhfAge,
    email: rhfEmail,
    password: rhfPassword,
    confirmPassword: rhfConfirmPassword,
    gender: rhfGender,
    acceptTerms: rhfAcceptTerms,
    picture: rhfPicture,
    country: rhfCountry,
  } = useAppSelector((state) => state.rhf);
  return (
    <div className={styles.content}>
      <h1>Display form information</h1>
      <div className={styles.content}>
        <div className={styles.row}>
          <p className={styles.item}>React Hook Form</p>
          <p className={styles.item}>Uncontrolled form</p>
        </div>
        <DisplayItem value={name} title="Name" rhf={rhfName} />
        <DisplayItem value={age} title="Age" rhf={rhfAge} />
        <DisplayItem value={email} title="Email" rhf={rhfEmail} />
        <DisplayItem value={password} title="Password" rhf={rhfPassword} />
        <DisplayItem
          value={confirmPassword}
          title="Confirm Password"
          rhf={rhfConfirmPassword}
        />
        <DisplayItem value={gender} title="Gender" rhf={rhfGender} />
        <DisplayItem value={country} title="Country" rhf={rhfCountry} />
        <DisplayItem
          value={acceptTerms ? "accepted" : "not accepted"}
          title="Is accept terms"
          rhf={rhfAcceptTerms ? "accepted" : "not accepted"}
        />
        <DisplayPicture value={picture} title="Picture" rhf={rhfPicture} />
      </div>
    </div>
  );
};
