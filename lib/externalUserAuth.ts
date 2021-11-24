// import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
const JwtKey = process.env.NEXT_PUBLIC_JWT_KEY ?? "";

export const isTokkenValid = (tokken: string) => {
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

  // console.log(hasValidToken);

  return hasValidToken;
};
