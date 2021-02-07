import { appTxt, textCtr, imgCtr } from "../../appStyles/appStyles.module.css";

export const Logo = () => {
  return (
    <div className={`${imgCtr} pt-2`}>
      <img
        src={
          "https://res.cloudinary.com/rahmad12/image/upload/v1609084232/PoldIt/App_Imgs/appLogo_rprp2a.png"
        }
        alt=""
      />
    </div>
  );
};

export const LogoText = () => {
  return (
    <img
      className={textCtr}
      src={
        "https://res.cloudinary.com/rahmad12/image/upload/v1609084232/PoldIt/App_Imgs/appLogo_only_lqymh2.png"
      }
      alt=""
    />
  );
};

// export const CustomHeaderTxt = ({ children, customStyle, viewHeight = "" }) => {
//   return (
//     <h2
//       className={`${appTxt} p-2 text-center ${customStyle}`}
//       style={{ height: viewHeight }}
//     >
//       {children}
//     </h2>
//   );
// };
