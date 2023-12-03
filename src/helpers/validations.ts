export const validateName = (name: string): string | null => {
  if (!/^[A-Z]/.test(name)) {
    return "Name should start with an uppercase letter.";
  }
  return null;
};

export const validateAge = (age: string): string | null => {
  const ageNumber = parseInt(age, 10);
  if (isNaN(ageNumber) || ageNumber < 0) {
    return "Age should be a non-negative number.";
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Invalid email format.";
  }
  return null;
};

export const validatePassword = (
  password: string,
  confirmPassword: string,
): string | null => {
  const passwordStrengthRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_+])[0-9a-zA-Z@#$%^&*()_+]{8,}$/;
  if (password !== confirmPassword) {
    return "Passwords do not match.";
  } else if (!passwordStrengthRegex.test(password)) {
    return "Password should contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character.";
  }
  return null;
};
