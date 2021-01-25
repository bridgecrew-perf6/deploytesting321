import React, { useEffect, useState, Component } from "react";
// import Router, { useRouter } from "next/router";
import GraphResolvers from "../../lib/apollo/apiGraphStrings";
import { runGraphQuery } from "../../lib/apollo/miscFunctions";

const { GET_USER } = GraphResolvers.queries;

// export const withAuthSync = (WrappedComponent) => {
//   return class AuthComponent extends Component {
//     static async getinitialProps({ req, res }) {
//       const response = await runGraphQuery("query", GET_USER, req);
//       if (!response) {
//         redirect(res, "/Login");
//         return {
//           data: null,
//         };
//       }

//       return {
//         data,
//       };
//     }

//     render() {
//       return <WrappedComponent {...this.props} />;
//     }
//   };
// };
// export async function getStaticProps({ req, res }) {
//   console.log('triggered')
//   const { data } = await runGraphQuery("query", GET_USER, req);
//   if (!data) {
//     return {
//       props: {
//         data: false,
//       },
//     };
//   }

//   return {
//     props: {
//       data,
//     },
//   };
// }
// export const withAuthSync = (WrappedComponent) =>
//   class AuthComponent extends Component {
//     static async getInitialProps({ req }) {
//       const { data } = await runGraphQuery("query", GET_USER, req);
//       if (!data) {
//         return {
//           props: {
//             data: false,
//           },
//         };
//       }

//       return {
//         props: {
//           data: true,
//         },
//       };
//     }

//     componentDidMount() {
//       const data = this.props;
//       if (!data) {
//         router.push("/Login");
//       }
//     }

//     render() {
//       return (
//         <div>
//           Test HOC
//           <WrappedComponent {...this.props} />
//         </div>
//       );
//     }
//   };

//   const router = useRouter();
//   //   console.log("Protected Route props: ", pageProps);
//   const { redirect } = pageProps;

//   if (redirect) {
//     router.push("/Login");
//   }

// return <PageComponent />;
