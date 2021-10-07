import React, { useEffect, useState } from "react";
import {
  AdminPara,
  ButtonCustomWidth,
  ButtonWithBlueBack,
  Model,
  ParaCustom,
  UsersDataFormInput,
} from "_components/pageComponents";
import usersInfoBox from "../../../../../appStyles/adminStyles/usersInfoBox.module.css";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { TiTickOutline } from "react-icons/ti";
import { AiOutlineClose } from "react-icons/ai";
import { privilege } from "./ProvideAR";
import userRightsStyles from "../../../../../appStyles/adminStyles/userRightsStyles.module.css";

const CreatePrivelege = (props: any) => {
  const {
    createPrivilegeModal,
    setCreatePrivilegeModal,
    privelegeInfo,
    setPrivilegeInfo,
    handleCloseCreatePricModal,
    handleSubmitCreatePrivilege,
    createPrivLoading,
    actionOnPrivlige,
    allPrivileges,
    setAllPrivileges,
    handleDeletePrivilege,
    privDeleteLoading,
    createPrivError,
    updatePrivLoading,
    handleUpdatePrivilege,
  } = props;
  const [loadingId, setLoadingId] = useState("");
  const [haveErr, setHaveErr] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (createPrivError?.message) setHaveErr(createPrivError?.message);
  }, [createPrivError?.message, allPrivileges]);

  const handleChangePrivilegeValue = (
    indexPrev: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newArr: any = [...allPrivileges];
    newArr[indexPrev] = {
      ...newArr[indexPrev],
      privilegeName: e.currentTarget.value,
    };
    setAllPrivileges(newArr);
  };

  return (
    <Model
      show={createPrivilegeModal}
      size="md"
      modalTitle={
        actionOnPrivlige === "Add"
          ? "Create Privileges"
          : actionOnPrivlige === "Remove"
          ? "Remove Privilege"
          : actionOnPrivlige === "Edit"
          ? "Edit Privilege"
          : null
      }
      handleClose={handleCloseCreatePricModal}
      height={"3rem"}
      width={"10rem"}
      footer={false}
    >
      <h4 style={{ marginBottom: "1rem" }}>
        {actionOnPrivlige === "Add"
          ? "Create New Privileges"
          : actionOnPrivlige === "Remove"
          ? "Remove Existing Privilege"
          : actionOnPrivlige === "Edit"
          ? "Edit Existing Privilege"
          : null}
      </h4>
      {actionOnPrivlige === "Add" ? (
        <form onSubmit={handleSubmitCreatePrivilege}>
          <div className={usersInfoBox.userInfoBox__inputWrapper}>
            <div className={usersInfoBox.userInfoBox__singleInputWrapper}>
              <AdminPara text="PrivilegeName" />
              <UsersDataFormInput
                type="text"
                required={true}
                name="privilege Name"
                value={privelegeInfo.privilegeName}
                error={haveErr}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setHaveErr("");
                  setPrivilegeInfo({
                    ...privelegeInfo,
                    privilegeName: e.currentTarget.value,
                  });
                }}
              />
            </div>

            <div className={usersInfoBox.modalButtonsWrapper}>
              <ButtonCustomWidth
                type="text"
                width={"9rem"}
                height={"2.5rem"}
                title="Cancel"
                onClick={() => setCreatePrivilegeModal(false)}
              />
              <ButtonCustomWidth
                width={"9rem"}
                height={"2.5rem"}
                type="submit"
                disabled={createPrivLoading ? true : false}
                title={createPrivLoading ? "Loading..." : "Submit Privilege"}
                onClick={() => "f"}
              />
            </div>
          </div>
        </form>
      ) : actionOnPrivlige === "Remove" ? (
        <div className={userRightsStyles.actionRemoveWrapper}>
          {allPrivileges.map((p: privilege, index: number) => (
            <div style={{ marginTop: "-15px" }} key={index}>
              <div className={userRightsStyles.removePrivileges}>
                <ParaCustom
                  paddingTop="10px"
                  text={p.privilegeName}
                  style={{ paddingTop: 10 }}
                />
                <ButtonWithBlueBack
                  width={"3rem"}
                  height={"2.5rem"}
                  type="submit"
                  disabled={createPrivLoading ? true : false}
                  title={<RiDeleteBin5Line />}
                  loading={
                    privDeleteLoading && p._id === loadingId ? true : false
                  }
                  onClick={() => {
                    setLoadingId(p._id);
                    handleDeletePrivilege(p._id);
                  }}
                />
              </div>
              <hr />
            </div>
          ))}
        </div>
      ) : actionOnPrivlige === "Edit" ? (
        <div className={userRightsStyles.actionRemoveWrapper}>
          {allPrivileges.map((p: privilege, index: number) => (
            <div style={{ marginTop: "-15px" }} key={index}>
              <div className={userRightsStyles.removePrivileges}>
                {loadingId !== p._id ? (
                  <ParaCustom
                    paddingTop="10px"
                    text={p.privilegeName}
                    style={{ paddingTop: 10 }}
                  />
                ) : (
                  <UsersDataFormInput
                    type="text"
                    required={true}
                    name="privilege Name"
                    value={p.privilegeName}
                    error={haveErr}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChangePrivilegeValue(index, e);
                    }}
                  />
                )}
                {edit && loadingId === p._id ? (
                  <div style={{ display: "flex" }}>
                    <ButtonWithBlueBack
                      width={"3rem"}
                      height={"2.5rem"}
                      margin="0px 5px"
                      type="submit"
                      disabled={createPrivLoading ? true : false}
                      title={<TiTickOutline size={20} />}
                      loading={
                        updatePrivLoading && p._id === loadingId ? true : false
                      }
                      onClick={async () => {
                        if (p.privilegeName === "") {
                          alert("Please provide a value");
                        } else {
                          await handleUpdatePrivilege(
                            p._id,
                            p.privilegeName,
                            p.privilegeStatus
                          );
                          setLoadingId("");
                          setEdit(false);
                        }
                      }}
                    />
                    <ButtonWithBlueBack
                      width={"3rem"}
                      height={"2.5rem"}
                      type="submit"
                      disabled={createPrivLoading ? true : false}
                      title={<AiOutlineClose size={17} />}
                      onClick={() => {
                        setEdit(false);
                        setLoadingId("");
                      }}
                    />
                  </div>
                ) : (
                  <ButtonWithBlueBack
                    width={"3rem"}
                    height={"2.5rem"}
                    type="submit"
                    disabled={createPrivLoading ? true : false}
                    title={<RiEdit2Line size={20} />}
                    onClick={() => {
                      setLoadingId(p._id);
                      setEdit(true);
                    }}
                  />
                )}
              </div>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <h3>Please select an action first</h3>
      )}
    </Model>
  );
};

export default CreatePrivelege;
