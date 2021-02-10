import GraphResolvers from "../../lib/apollo/apiGraphStrings";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/authProvider";
import { runGraphQuery } from "../../lib/apollo/miscFunctions";
import { CardForm } from "../../components/layout/CompStyles";
import {
  ProfileHeader,
  ProfileBody_Card,
} from "../../components/pageComponents/Profile";

const { GET_USER } = GraphResolvers.queries;

const Profile = () => {
  const { updateErrors } = useAuth();

  const router = useRouter();
  const { data } = router.query;

  const [edit, handleEdit] = useState(false);

  // useEffect(() => {
  //   console.log(data);
  //   if (!data) {
  //     updateErrors([{ message: "Not Authenticated.  Please Log In!" }]);
  //     router.push("/Login");
  //   }
  // }, [data]);

  return <div>test</div>

  // const handleImage = async () => {
  //   console.log("Pic triggered");
  // };

  // if (error) {
  //   return <div>Loading...</div>;
  // }
  // if (data) {
  //   return (
  //     <CardForm ctrStyle={"90%"} title={router.pathname}>
  //       <ProfileHeader data={data} handleImg={() => handleImage} />
  //       <div className="p-3" style={{ width: "35%" }}>
  //         <ProfileBody_Card data={data} edit={() => handleEdit(!edit)} />
  //       </div>
  //     </CardForm>
  //     // <div>
  //     //   <h1>Profile Page</h1>
  //     //   <span>{JSON.stringify(data)}</span>
  //     // </div>
  //   );
  // }
};

export default Profile;

// const Profile = ({ data, error }) => {
//   const { updateErrors } = useAuth();

//   const router = useRouter();

//   const [edit, handleEdit] = useState(false);

//   useEffect(() => {
//     if (error) {
//       updateErrors([{ message: error }]);
//       router.push("/Login");
//     }
//   }, [error]);

//   const handleImage = async () => {
//     console.log("Pic triggered");
//   };

//   if (error) {
//     return <div>Loading...</div>;
//   }
//   if (data) {
//     return (
//       <CardForm ctrStyle={"90%"} title={router.pathname}>
//         <ProfileHeader data={data} handleImg={() => handleImage} />
//         <div className="p-3" style={{ width: "35%" }}>
//           <ProfileBody_Card data={data} edit={() => handleEdit(!edit)} />
//         </div>
//       </CardForm>
//       // <div>
//       //   <h1>Profile Page</h1>
//       //   <span>{JSON.stringify(data)}</span>
//       // </div>
//     );
//   }
// };

// export default Profile;

//getStaticProps may be better here than getServerSideProps
// export async function getServerSideProps({ req, res }) {
//   try {
//     const { data } = await runGraphQuery("query", GET_USER, req);
//     return {
//       props: {
//         data,
//       },
//     };
//   } catch (err) {
//     return {
//       props: {
//         error: err.message,
//       },
//     };
//   }
// }
