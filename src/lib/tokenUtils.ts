"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { setCookie } from "./cookieUtils";

const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;

const getTokenSecondsToExpire = (token: string): number => {
  if (!token) return 0;

  try {
    const tokenPayload = JWT_ACCESS_TOKEN_SECRET
      ? (jwt.verify(token, JWT_ACCESS_TOKEN_SECRET) as JwtPayload)
      : (jwt.decode(token) as JwtPayload);

    if (tokenPayload && !tokenPayload.exp) {
      return 0;
    }

    const remainingSeconds =
      tokenPayload && tokenPayload.exp
        ? tokenPayload.exp - Math.floor(Date.now() / 1000)
        : 0;

    return remainingSeconds > 0 ? remainingSeconds : 0;
  } catch (error) {
    console.error("Error decoding token:", error);
    return 0;
  }
};

export const setTokenInCookies = async (name: string, token: string) => {
  const maxAgeInSeconds = getTokenSecondsToExpire(token);

  await setCookie(name, token, maxAgeInSeconds);
};
