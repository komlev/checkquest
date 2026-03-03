import { useEffect, useState } from "preact/compat";

const getIsDarkTheme = () => {
  try {
    const stored = localStorage.getItem("isdark");
    if (stored !== null) {
      return stored === "true";
    }
    return !!window?.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch (_err) {
    return !!window?.matchMedia("(prefers-color-scheme: dark)").matches;
  }
};

export const useTheme = () => {
  const [isdark, setIsdark] = useState(getIsDarkTheme());
  useEffect(() => {
    localStorage.setItem("isdark", JSON.stringify(isdark));
  }, [isdark]);

  return { isdark, setIsdark };
};
