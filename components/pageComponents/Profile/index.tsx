import styles from "../../../appStyles/appStyles.module.css";
import { User } from "../../appTypes/appType";
import { MssgReadMoreLess } from "../../layout/customComps";

const {
  appColor,
  appTxt,
  appImg,
  appbg_secondary,
  floatingCtr,
  popup,
} = styles;

interface ProfileData {
  data: User | undefined;
  handleImg?: () => void;
  edit?: () => void;
}

export const ProfileHeader = ({ data, handleImg }: ProfileData) => {
  const profileImg = data?.profilePic
    ? data.profilePic
    : "https://res.cloudinary.com/rahmad12/image/upload/v1590505676/FoodEase/Profile/vendor/5e78e50191e6cb1f9133038a/profileImages/profilePic.jpg";

  return (
    <div
      className={`d-flex flex-column align-items-center ${appColor} text-white`}
      style={{ height: "12vh" }}
    >
      <h1 className={`${appTxt} ${appColor} text-white mt-3`}>PROFILE</h1>
      <div className={floatingCtr}>
        <img
          src={profileImg}
          alt="..."
          className={`${appImg} rounded-circle cursor`}
          onClick={handleImg}
        />
      </div>
      <div className={popup}>Click to update Image</div>
    </div>
  );
};

export const ProfileBody_Card = ({ data, edit }: ProfileData) => {
  const mssg =
    "This is a wider card with supporting text below as a natural lead-into additional content. This content is a little bit longer. This is a wider card with supporting text below as a natural lead-into additional content. This content is a little bit longer";

  return (
    <div className={`card ${appbg_secondary}`}>
      <div className="card-body">
        <h5 className="card-title">About</h5>
        <MssgReadMoreLess mssg={mssg} />
      </div>
      <ProfileMetrics data={data} />
      {/* <div className="card-footer">
          <small className="text-muted">Last updated 3 mins ago</small>
        </div> */}
    </div>
  );
};

const ProfileMetrics = ({ data }: ProfileData) => {
  //Once data is fed from DB, that data will be parsed here to make the list. This is a placeholder
  const testDataArray = [
    { title: "Polls", count: 34 },
    { title: "Answers", count: 75 },
    { title: "Comments", count: 530 },
    { title: "Replies", count: 546 },
    { title: "Favorites", count: 4000 },
  ];

  return (
    <div>
      <ul className="list-group">
        {testDataArray.map((item, idx) => (
          <li
            className="list-group-item d-flex justify-content-between text-muted"
            key={idx}
          >
            <small className="text-muted font-weight-bold">{item.title}</small>
            <small className="text-muted font-weight-bold">{item.count}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};
