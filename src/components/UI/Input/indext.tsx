import React, { ChangeEvent } from "react";

interface InputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const Input: React.FC<InputProps> = ({ onChange, value }) => {
  return <input onChange={onChange} value={value} />;
};
