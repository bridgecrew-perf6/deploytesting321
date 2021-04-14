import appStyles from "../../../../appStyles/appStyles.module.css";

interface AppLoadProps {
  style: {
    height: string;
    width: string;
  };
  message: string;
}

const AppLoading = ({ style, message }: AppLoadProps) => {
  const appLoader =
    "https://res.cloudinary.com/rahmad12/image/upload/v1617835780/PoldIt/App_Imgs/PoldIt_Loader_rz1w5a.gif";

  return (
    <div className="d-flex flex-column justify-content-between align-items-center mt-3">
      <img
        src={appLoader}
        alt="App Loader"
        width={style.width}
        height={style.height}
      />
      <p
        className={`${appStyles.formTxt}`}
        style={{ fontSize: 14, color: "gray" }}
      >{`Loading ${message}`}</p>
    </div>
  );
};

export default AppLoading;
