import { Request, Response } from "express";
// import { Request } from "express-serve-static-core";
// import { Response } from "express-serve-static-core";
import { DocumentNode } from "graphql";
import { Http2ServerRequest, Http2ServerResponse } from "http2";
import { initializeApollo, storeTokens } from "../apollo";
// import { parseCookies } from "../../graphql/middleware/cookie";
// import Router from "next/router";

// export const sendRefreshToken = (res: Response, token: string) => {
//   if (res.cookie) {
//     res.cookie("poldIt_session", token, {
//       httpOnly: true,
//       domain: ".poldit.com",
//     });
//   }
// };

export const runGraphQuery = async (
  queryType: string,
  query: DocumentNode,
  req: Request,
  variables = {}
) => {
  const apolloClient = initializeApollo();
  const appCookie = req.headers?.cookie;

  storeTokens("", appCookie);

  let response;

  if (queryType === "mutation") {
    response = await apolloClient.mutate({
      mutation: query,
      variables,
    });
  } else {
    response = await apolloClient.query({
      query,
    });
  }

  return response;
};

// export const redirect = (res, targetRoute) => {
//   if (res) {
//     res.writeHead(303, { Location: targetRoute });
//   } else {
//     Router.replace(targetRoute);
//   }
// };