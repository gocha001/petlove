import { useEffect, useState } from "react";

export const useFilledInput = (value) => {
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    setIsFilled((value ?? "").trim() !== "");
  }, [value]);

  return isFilled;
};
