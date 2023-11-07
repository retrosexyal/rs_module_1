import { useState } from "react";
import { Button } from "../UI/Button";

export const ErrorBtn = () => {
  const [throwError, setThrowError] = useState(false);

  const handleClick = () => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error("This is a simulated error");
  }
  return (
    <div>
      <Button onClick={handleClick} text="error" />
    </div>
  );
};
