// import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
const JwtKey = process.env.NEXT_PUBLIC_JWT_KEY ?? "";

export const isTokkenValidInternalUser = (tokken: string) => {
  let hasValidToken;
  let decodedToken;
  if (!tokken) {
    return false;
  }
  try {
    decodedToken = jwt.verify(tokken, JwtKey);
    hasValidToken = true;
  } catch (err) {
    hasValidToken = false;
  }

  console.log(hasValidToken);

  return hasValidToken;
};

export const isInternalUserAuth = (tokken: string) => {
  if (!isTokkenValidInternalUser(tokken)) {
    throw new Error("Sorry Session Expired , Login Again to continue !");
  }
};
