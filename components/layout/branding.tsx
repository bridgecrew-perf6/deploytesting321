import styles from "../../appStyles/appStyles.module.css";

export const Logo = () => {
  return (
    <div className={`${styles.imgCtr} pt-1 border-0`}>
      <img
        src={
          "https://res.cloudinary.com/rahmad12/image/upload/v1624921500/PoldIt/App_Imgs/PoldIt_logo_only_agkhlf.png"
        }
        alt=""
      />
    </div>
  );
};

<<<<<<< HEAD
export const LogoText = () => {
  return (
    <img
=======
export const LogoText = (props: any) => {
  return (
    <img
      onClick={props.onClick}
>>>>>>> 62ea7d89505d835ee4ccb6a4731424ccca8ce4b5
      className={styles.textCtr}
      src={
        "https://res.cloudinary.com/rahmad12/image/upload/v1630088216/PoldIt/App_Imgs/appLogo_only_new_feghxj.png"
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
