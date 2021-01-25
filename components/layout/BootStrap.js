import Head from "next/head";
import {MssgReadMoreLess} from './customComps'
// import { Jumbotron, Container, Card } from "react-bootstrap";
// import {
//   appColor,
//   appTxt,
//   appImg,
//   appbg_secondary,
// } from "../../appStyles/appStyles.module.css";

export default function WithBootStrap({ children }) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>
      <div>{children}</div>
    </div>
  );
}

export const CardForm = (props) => {
  const pageTitle = `PoldIt ${props.title.replace("/", "")}`;

  return (
    <div className="jumbotron vertical-center">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div
        className="container card text-black p-0"
        style={{ maxWidth: props.ctrStyle }}
      >
        {props.children}
      </div>
    </div>
  );
};

// export const ProfileHeader = ({ data, handleImg }) => {
//   const profileImg = data.profilePic
//     ? data.profilePic
//     : "https://res.cloudinary.com/rahmad12/image/upload/v1590505676/FoodEase/Profile/vendor/5e78e50191e6cb1f9133038a/profileImages/profilePic.jpg";

//   return (
//     <div
//       className={`d-flex flex-column align-items-center ${appColor} text-white`}
//       style={{ height: "12vh" }}
//     >
//       <h1 className={`${appTxt} ${appColor} text-white mt-3`}>PROFILE</h1>
//       <div className="floatingCtr">
//         <img
//           src={profileImg}
//           alt="..."
//           className={`${appImg} rounded-circle cursor`}
//           onClick={handleImg}
//         />
//       </div>
//       <div className="popup">Click to update Image</div>
//     </div>
//   );
// };

// export const ProfileBody_Card = ({ data, edit }) => {
//   const mssg =
//     "This is a wider card with supporting text below as a natural lead-into additional content. This content is a little bit longer. This is a wider card with supporting text below as a natural lead-into additional content. This content is a little bit longer";

//   return (
//     <div className={`card ${appbg_secondary}`}>
//       <div className="card-body">
//         <h5 className="card-title">About</h5>
//         <MssgReadMoreLess mssg={mssg} />
//       </div>
//       <ProfileMetrics  />
//       {/* <div className="card-footer">
//         <small className="text-muted">Last updated 3 mins ago</small>
//       </div> */}
//     </div>
//   );
// };
