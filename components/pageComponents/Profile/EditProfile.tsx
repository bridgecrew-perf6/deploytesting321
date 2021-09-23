import React, { useEffect, useState } from "react";
import "jquery";
import styles from "../../../appStyles/appStyles.module.css";
import btnStyles from "../../../appStyles/btnStyles.module.css";
import { SelectedImage, StatesUS, User } from "../../appTypes/appType";
import { useMutation, useQuery } from "@apollo/client";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import { StateVals } from "../../formFuncs/formFuncs";
import { SingleImagePicker } from "../Other/Image/ImgPicker";
import { IoPersonCircle } from "react-icons/io5";
import { saveImgtoCloud } from "../../apis/imgUpload";
import { updateUserProfile } from "../../../lib/apollo/apolloFunctions/userMutations";

interface ProfileModal {
  user: User;
}

interface UpdatedObj {
  [prop: string]: string;
}

const { appTxt, appbg_other } = styles;
const { imgIconBtn, customBtn, customBtnOutline, customBtnOutlinePrimary } =
  btnStyles;

const EditProfile = ({ user }: ProfileModal) => {
  const initialUserData = { ...user, bio: user.bio ? user.bio : "" };

  const [userDetails, setUserDetails] = useState<User>(initialUserData);
  const [stateList, setStateList] = useState<StatesUS[]>([]);
  const [userState, setUserState] = useState("");
  const [selectedImg, selectImg] = useState<SelectedImage | null>(null);
  const { data, loading } = useQuery(GraphResolvers.queries.GET_STATES_US);
  const [updateUser] = useMutation(GraphResolvers.mutations.UPDATE_USER);

  useEffect(() => {
    if (data) {
      setStateList(data.statesUS);
      setUserDetails(user);
      user.state && setUserState(user.state);
    }
  }, [user, data]);

  const imgHandler = (e: any) => {
    const fileObjList: File[] = Array.from(e.target?.files);
    const fileURL = URL.createObjectURL(fileObjList[0]);

    const newProfileImg = {
      imageName: fileObjList[0].name.split(".")[0],
      image: fileObjList[0],
      imageUri: fileURL,
      userId: user._id,
      imgType: "profile",
    };

    selectImg(newProfileImg);
  };

  const updateUserData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUserDetails({
      ...userDetails,
      [e.target.id as keyof User]: e.target.value,
    });
  };

  const undoChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserDetails(initialUserData);
    user.state && setUserState(user.state);

    selectImg(null);
  };

  const closeModal = () => {
    ($("#editProfileModal") as any).modal("hide"); //closes modal programitically
    (document.getElementById("editProfile") as HTMLFormElement).reset();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp: any = document.querySelectorAll("#editProfile input, textarea");
    const updatedUser: UpdatedObj = {};

    //Add error handling

    for (let i = 0; i < resp.length; i++) {
      const ele = resp[i];

      if (ele.value && ele.id === "imgPicker" && selectedImg) {
        const imgIds = await saveImgtoCloud([selectedImg]);
        const finalVal = imgIds && imgIds?.length > 0 && imgIds[0];
        updatedUser["profilePic"] = finalVal;
      } else if (ele.value && ele.id !== "imgPicker") {
        updatedUser[ele.id] = ele.value;
      }
    }
    updatedUser["_id"] = user._id;
    updateUserProfile(updateUser, JSON.stringify(updatedUser));
    closeModal();
  };

  const ProfileImg = () => {
    if (selectedImg) {
      return (
        <div className="rounded-circle overflow-auto">
          <img src={selectedImg.imageUri} style={{ height: 150, width: 150 }} />
        </div>
      );
    }

    if (user.profilePic) {
      return (
        <div className="rounded-circle overflow-auto">
          <img src={user.profilePic} style={{ height: 150, width: 150 }} />
        </div>
      );
    }

    return (
      <IoPersonCircle
        style={{
          height: 150,
          width: 150,
          color: "#a9a9a9",
          zIndex: 1,
        }}
      />
    );
  };

  return (
    <div
      className="modal fade"
      id="editProfileModal"
      tabIndex={-1}
      aria-labelledby="editProfileModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="d-inline-flex" style={{ backgroundColor: "#a9a9a9" }}>
            <h4 className={`text-center p-2 modal-title ${appTxt} w-100`}>
              EDIT PROFILE
            </h4>
            <div
              className="close pr-2 align-self-center"
              aria-label="Close"
              style={{ color: "#ffffff", cursor: "pointer" }}
              onClick={() => closeModal()}
            >
              <span aria-hidden="true">&times;</span>
            </div>
          </div>

          <div className="modal-body">
            <form
              id="editProfile"
              onSubmit={handleSubmit}
              onReset={undoChanges}
              style={{ color: "#696969" }}
            >
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Email</label>
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    id="email"
                    value={userDetails.email}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Username</label>
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    id="appid"
                    value={userDetails.appid}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    value={userDetails.firstname}
                    onChange={(e) => updateUserData(e)}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    value={userDetails.lastname}
                    onChange={(e) => updateUserData(e)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address1"
                  value={userDetails.address1}
                  onChange={(e) => updateUserData(e)}
                />
              </div>
              <div className="form-group">
                <label>Address 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="address2"
                  value={userDetails.address2}
                  onChange={(e) => updateUserData(e)}
                />
              </div>

              <div className="form-row">
                <div className="form-group col-md-5">
                  <label>City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    value={userDetails.city}
                    onChange={(e) => updateUserData(e)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label>State</label>
                  <select
                    id="state"
                    className="form-control"
                    value={userState}
                    onChange={(e) => setUserState(e.target.value)}
                  >
                    {stateList.length > 0 ? (
                      <StateVals
                        stateList={stateList}
                        activeState={userState}
                      />
                    ) : (
                      <option>Loading...</option>
                    )}
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="inputZip">Zip Code</label>
                  <input
                    type="number"
                    className="form-control"
                    id="zipcode"
                    value={userDetails.zipcode}
                    onChange={(e) => updateUserData(e)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputBio">About Me</label>
                <textarea
                  className="form-control"
                  id="bio"
                  rows={5}
                  placeholder={
                    userDetails.bio === ""
                      ? "Please tell us about yourself!"
                      : ""
                  }
                  value={userDetails.bio}
                  onChange={(e) => updateUserData(e)}
                ></textarea>
              </div>
              <div className="form-row pt-2 pb-2">
                <div className="form-group d-flex flex-column flex-fill align-items-center">
                  <label className="">Profile Photo</label>
                  <div className="position-relative">
                    <ProfileImg />
                    <div className={`rounded bg-white ${imgIconBtn}`}>
                      <SingleImagePicker handleImg={imgHandler} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button type="reset" className="btn btn-danger">
                  Undo Changes
                </button>
                <button
                  type="submit"
                  className={`${customBtn} ${customBtnOutline} ${customBtnOutlinePrimary}`}
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
