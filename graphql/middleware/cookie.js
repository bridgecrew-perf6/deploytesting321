import { serialize, parse } from "cookie";
import { storeTokens } from "../../lib/apollo";

const cookie = (res, name, value, options = {}) => {
  const stringValue =
    typeof value === "object" ? JSON.stringify(value) : String(value);

  if (options?.maxAge > -1) {
    options.expires = new Date(Date.now() + options.maxAge);
  } else options.expires = new Date(0);

  res.setHeader("Set-Cookie", serialize(name, String(stringValue), options));
};

const withCookies = (handler) => (req, res) => {
  res.cookie = (name, value, options) => cookie(res, name, value, options);

  return handler(req, res);
};

export default withCookies;

// export const parseCookies = (req) => {
//   // let appCookie;

//   const appCookie = req?.headers?.cookie ? req.headers.cookie : 

//   // const refreshTokenCookie = parse(
//   //   req?.headers?.cookie ? req.headers.cookie : ""
//   // );

//   // const appCookie = refreshTokenCookie["poldIt-Session"]
//   //   ? refreshTokenCookie["poldIt-Session"]
//   //   : "";

//   // console.log('parseCookies triggered: ', refreshTokenCookie['poldIt-Session']);

//   // if (Object.keys(refreshTokenCookie).length === 0) {
//   //   appCookie = "";
//   // } else appCookie = JSON.stringify(refreshTokenCookie);

//   storeTokens("", appCookie);
// };
