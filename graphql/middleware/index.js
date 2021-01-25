const jwt = require("jsonwebtoken");
const { serialize, parse } = require("cookie");
const User = require("../../models/UserModel");

const { JWT_KEY, REFRESH_KEY } = process.env;

let decodedToken;

export const isAuthenticated = (req) => {
  const appToken = hasAppToken(req);
  const appCookie = hasCookie(req);

  let isAuth;

  if (appToken.hasValidToken) {
    isAuth = { auth: true, id: appToken.userId };
  } else if (!appToken.hasValidToken && appCookie.hasValidCookie) {
    isAuth = { auth: true, id: appCookie.userId };
  } else {
    isAuth = { auth: false, id: null };
  }

  return isAuth;
};

const hasAppToken = (req) => {
  const currentToken = req.headers.authorization;

  let hasValidToken;

  if (!currentToken || currentToken === "") {
    hasValidToken = false;
  }

  try {
    decodedToken = jwt.verify(currentToken, JWT_KEY);
    hasValidToken = true;
  } catch (err) {
    hasValidToken = false;
  }

  return { hasValidToken, userId: decodedToken ? decodedToken.id : null };
};

const hasCookie = (req) => {
  const refreshToken = req.headers.cookie;

  let hasValidCookie;

  if (!refreshToken || refreshToken === "" || refreshToken === {}) {
    return { hasValidCookie: false };
  }

  const cookie = parse(refreshToken)["poldIt-Session"];

  try {
    decodedToken = jwt.verify(cookie, REFRESH_KEY);
  } catch (err) {
    hasValidCookie = false;
  }

  hasValidCookie = true;

  return { hasValidCookie, userId: decodedToken ? decodedToken.id : null };
};

// export const refreshAppToken = (req, res) => {
//   const appCookie = req.headers.cookie;
//   console.log("refreshToken middleware: ", appCookie);
// };
