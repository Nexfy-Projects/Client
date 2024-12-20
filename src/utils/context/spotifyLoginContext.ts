import { useContext, useEffect } from "react";
import { RedirectContext } from "../loginContext";
import { parse } from "cookie";

export const useRedirect = () => {
  const context = useContext(RedirectContext);
  if (!context) {
    throw new Error("useRedirect must be used within a RedirectProvider");
  }

  // Cookieから状態を取得
  useEffect(() => {
    const cookies = parse(document.cookie);
    if (cookies.redirected === "true") {
      context.setRedirected(true);
    }
  }, [context]);

  return context;
};
