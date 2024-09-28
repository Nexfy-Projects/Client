import { useContext } from "react";
import { RedirectContext } from "../utils/context/loginContext";

export const useRedirect = () => {
  const context = useContext(RedirectContext);
  if (!context) {
    throw new Error("useRedirect must be used within a RedirectProvider");
  }
  return context;
};
