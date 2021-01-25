import styles from '../../appStyles/appStyles.module.css'

export const Logo = ({ imgstyle }) => {
  return <img src={"https://res.cloudinary.com/rahmad12/image/upload/v1609084232/PoldIt/App_Imgs/appLogo_rprp2a.png"} alt="" style={imgStyle} />;
};

export const LogoText = () => {
  return <img className={styles.textCtr} src={"https://res.cloudinary.com/rahmad12/image/upload/v1609084232/PoldIt/App_Imgs/appLogo_only_lqymh2.png"} alt=""/>;
};
