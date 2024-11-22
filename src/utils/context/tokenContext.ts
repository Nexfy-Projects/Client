import { useContext } from "react";
import { TokenContext } from "../tokenProvider";

export const useTokenContext = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};

export const useSetToken = () => {
  const { accessToken, setAccessToken, refreshToken, setRefreshToken } =
    useTokenContext();
  const AccessToken = (token: string | "") => {
    setAccessToken(token);
  };
  const RefreshToken = (token: string | "") => {
    setRefreshToken(token);
  };
  return {
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    AccessToken,
    RefreshToken,
  };
};
