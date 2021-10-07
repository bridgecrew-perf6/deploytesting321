import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ButtonCustomWidth, SimpleTable } from "_pageComponents/index";
import userRightsStyles from "../../../../../appStyles/adminStyles/userRightsStyles.module.css";
import GraphResolvers from "../../../../../lib/apollo/apiGraphStrings";
import _ from "lodash";
import RoleActionModal from "./RoleActionModal";
import ManageUserPrivileges from "./ManageUserPrivileges";
import CreateRoleModal from "./CreateRoleModal";
import ManagePrivileges from "./ManagePrivileges";
import CreatePrivelege from "./CreatePrivileges";

const { GET_ALL_ROLES, GET_ALL_PRIVILEGES } = GraphResolvers.queries;

interface rolesType {
  role: string;
  description: string;
  status: string;
  action: any;
  privileges: string[];
}

export interface privilege {
  _id?: any;
  privilegeName: string;
  privilegeStatus: boolean;
}

const ProvideAR = () => {
  const { data, refetch, loading, error } = useQuery(GET_ALL_ROLES);
  const [rolesdata, setRolesData] = useState<rolesType[]>([]);
  const [showRoleActionModal, setShowRoleActionModal] = useState(false);
  const [roleLabelOnModal, setRoleLabelOnModal] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [showPrivModal, setShowPrivModal] = useState(false);
  const [selectedRoleValue, setSelectedROleValue] = useState({});
  const [allPrivileges, setAllPrivileges] = useState([]);
  const [managePrivModal, setManagePrivModal] = useState(false);
  const [actionOnPrivlige, setActionOnPrivilege] = useState();
  const [roleData, setRoleData] = useState({
    role: "",
    description: "",
  });
  const [createPrivilegeModal, setCreatePrivilegeModal] = useState(false);
  const [privelegeInfo, setPrivilegeInfo] = useState<privilege>({
    privilegeName: "",
    privilegeStatus: true,
  });
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const {
    data: privilegesData,
    refetch: pRefetch,
    loading: privsLoading,
  } = useQuery(GET_ALL_PRIVILEGES);

  const [
    deletePrivilege,
    { loading: privDeleteLoading, error: pricDeleteError },
  ] = useMutation(GraphResolvers.mutations.DELETE_PRIVILEGE, {
    refetchQueries: [
      {
        query: GET_ALL_PRIVILEGES,
      },
    ],
  });

  const [
    createNewPrivilege,
    { loading: createPrivLoading, error: createPrivError },
  ] = useMutation(GraphResolvers.mutations.CREATE_NEW_PRIVILEGE, {
    refetchQueries: [
      {
        query: GET_ALL_PRIVILEGES,
      },
    ],
  });

  const [
    updatePrivilege,
    { loading: updatePrivLoading, error: updatePrivError },
  ] = useMutation(GraphResolvers.mutations.UPDATE_PRIVILEGES, {
    refetchQueries: [
      {
        query: GET_ALL_PRIVILEGES,
      },
    ],
  });

  useEffect(() => {
    if (privilegesData && !privsLoading) {
      setAllPrivileges(privilegesData.allPrivileges);
    }
  }, [privilegesData]);

  const [activateRole, { loading: loadingA, error: errorA }] = useMutation(
    GraphResolvers.mutations.ACTIVATE_ROLE,
    {
      refetchQueries: [
        {
          query: GET_ALL_ROLES,
        },
      ],
    }
  );

  const [disableRole, { loading: loadingB, error: errorB }] = useMutation(
    GraphResolvers.mutations.DISABLE_ROLE,
    {
      refetchQueries: [
        {
          query: GET_ALL_ROLES,
        },
      ],
    }
  );

  const [createNewRole, { loading: loadingC, error: errorC }] = useMutation(
    GraphResolvers.mutations.CREATE_NEW_ROLE,
    {
      refetchQueries: [
        {
          query: GET_ALL_ROLES,
        },
      ],
    }
  );

  const [updateRolePrivilages, { loading: loadingD, error: errorD }] =
    useMutation(GraphResolvers.mutations.UPDATE_ROLE_PRIVILAGES, {
      refetchQueries: [
        {
          query: GET_ALL_ROLES,
        },
      ],
    });

  const columnData = {
    columns: [
      {
        dataField: "role",
        text: "Role",
        sort: true,
        events: {
          onClick: (
            e: any,
            column: any,
            columnIndex: number,
            row: any,
            rowIndex: number
          ) => {
            setSelectedRole(row.role);
            handleRolePrivilages(row);
          },
        },
      },
      {
        dataField: "description",
        text: "Description",
        sort: true,
      },
      {
        dataField: "status",
        text: "Status",
        sort: true,
      },
      {
        dataField: "action",
        text: "Action",
        style: {
          cursor: "pointer",
        },
        events: {
          onClick: (
            e: any,
            column: any,
            columnIndex: number,
            row: any,
            rowIndex: number
          ) => {
            if (row.status === "Inactive") {
              setRoleLabelOnModal("Activate");
              setSelectedRole(row.role);
              handleRoleModal();
            } else {
              setRoleLabelOnModal("Deactivate");
              setSelectedRole(row.role);
              handleRoleModal();
            }
          },
        },
      },
    ],
  };

  const handleRolePrivilages = (row: any) => {
    setSelectedROleValue(row);
    setShowPrivModal(true);
  };

  const handleUpdatePrivilages = async () => {
    let validatedPrivilages: any = [];
    allPrivileges.map((pd: any) => {
      if (pd.privilegeStatus === true) {
        validatedPrivilages.push(pd._id);
      }
    });
    await updateRolePrivilages({
      variables: { roleName: selectedRole, privileges: validatedPrivilages },
    });
    setShowPrivModal(false);
  };

  const handleCreateNewRole = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createNewRole({
      variables: {
        role: roleData.role,
        description: roleData.description,
        status: "Active",
      },
    });
    setShowCreateRoleModal(false);
  };

  const getTableOfRoles = () => (
    <>
      {loading && rolesdata.length === 0 ? (
        <h5>Loading...</h5>
      ) : (
        <SimpleTable rolesdata={rolesdata} columndata={columnData.columns} />
      )}
    </>
  );

  const handleRoleModal = () => {
    setShowRoleActionModal(true);
  };

  const handleCreateModal = () => {
    setShowCreateRoleModal(true);
  };

  const handleCloseRoleModal = () => {
    setShowCreateRoleModal(false);
    setShowPrivModal(false);
    setShowRoleActionModal(false);
    setManagePrivModal(false);
  };

  const handleCloseCreatePricModal = () => {
    setCreatePrivilegeModal(false);
  };

  const handleSubmitCreatePrivilege = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await createNewPrivilege({
      variables: { privilegeName: privelegeInfo.privilegeName },
    });
    setCreatePrivilegeModal(false);
    setPrivilegeInfo({ ...privelegeInfo, privilegeName: "" });
  };

  const activateRoleFunction = async () => {
    await activateRole({
      variables: { roleName: selectedRole },
    });
    setShowRoleActionModal(false);
  };

  const disableRoleFunction = async () => {
    await disableRole({
      variables: { roleName: selectedRole },
    });
    setShowRoleActionModal(false);
  };

  const handleDeletePrivilege = async (_id: String) => {
    await deletePrivilege({
      variables: { _id: _id },
    });
    let updatedPriv = allPrivileges.filter((p: privilege) => {
      return p._id !== _id;
    });
    setAllPrivileges(updatedPriv);
  };

  const handleUpdatePrivilege = async (
    _id: string,
    privName: string,
    privStatus: boolean
  ) => {
    await updatePrivilege({
      variables: {
        privilegeId: _id,
        privilegeName: privName,
        privilegeStatus: privStatus,
      },
    });
  };

  useEffect(() => {
    if (error) throw new Error(error.message);
    if (!loading && data) {
      let roles: rolesType[] = [];
      data?.allRoles.map((r: any) => {
        roles.push({
          role: r.role,
          description: r.description,
          status: r.status,
          action:
            r.status === "Active" ? (
              <div
                className="badge badge-pill badge-danger"
                style={{ fontSize: 14, lineHeight: 1.5 }}
              >
                Click to Disable
              </div>
            ) : (
              <div
                className="badge badge-pill badge-primary "
                style={{ fontSize: 14, lineHeight: 1.5 }}
              >
                Click to Enable
              </div>
            ),
          privileges: r.privileges,
        });
      });
      let uniq = _.uniqBy(roles, (x) => x.role);
      setRolesData(uniq);
    }
  }, [data, loading]);

  return (
    <div className={userRightsStyles.userRightsWrapper}>
      <h1>Access Rights</h1>
      <div className={userRightsStyles.upperButtons}>
        <ButtonCustomWidth
          height="2.5rem"
          width="8rem"
          type="text"
          onClick={handleCreateModal}
          title="Create new role"
        />
        <ButtonCustomWidth
          height="2.5rem"
          width="10rem"
          type="text"
          onClick={() => setManagePrivModal(true)}
          title="Manage Privilege"
        />
      </div>
      <div className={userRightsStyles.tableWrapper}>{getTableOfRoles()}</div>
      <RoleActionModal
        handleCloseRoleModal={handleCloseRoleModal}
        showRoleActionModal={showRoleActionModal}
        setShowRoleActionModal={setShowRoleActionModal}
        roleLabelOnModal={roleLabelOnModal}
        activateRoleFunction={activateRoleFunction}
        disableRoleFunction={disableRoleFunction}
        loadingA={loadingA}
        loadingB={loadingB}
      />
      <ManageUserPrivileges
        showPrivModal={showPrivModal}
        setShowPrivModal={setShowPrivModal}
        handleCloseRoleModal={handleCloseRoleModal}
        selectedRole={selectedRole}
        handleUpdatePrivilages={handleUpdatePrivilages}
        selectedRoleValue={selectedRoleValue}
        loadingD={loadingD}
        allPrivileges={allPrivileges}
        setAllPrivileges={setAllPrivileges}
      />
      <CreateRoleModal
        showCreateRoleModal={showCreateRoleModal}
        setShowCreateRoleModal={setShowCreateRoleModal}
        selectedRole={selectedRole}
        handleCloseRoleModal={handleCloseRoleModal}
        handleCreateNewRole={handleCreateNewRole}
        roleData={roleData}
        setRoleData={setRoleData}
        loadingC={loadingC}
      />
      <ManagePrivileges
        managePrivModal={managePrivModal}
        setManagePrivModal={setManagePrivModal}
        handleCloseRoleModal={handleCloseRoleModal}
        setCreatePrivilegeModal={setCreatePrivilegeModal}
        actionOnPrivlige={actionOnPrivlige}
        setActionOnPrivilege={setActionOnPrivilege}
      />
      <CreatePrivelege
        privelegeInfo={privelegeInfo}
        setPrivilegeInfo={setPrivilegeInfo}
        createPrivilegeModal={createPrivilegeModal}
        setCreatePrivilegeModal={setCreatePrivilegeModal}
        handleSubmitCreatePrivilege={handleSubmitCreatePrivilege}
        createPrivLoading={createPrivLoading}
        createPrivError={createPrivError}
        handleCloseCreatePricModal={handleCloseCreatePricModal}
        actionOnPrivlige={actionOnPrivlige}
        allPrivileges={allPrivileges}
        setAllPrivileges={setAllPrivileges}
        handleDeletePrivilege={handleDeletePrivilege}
        privDeleteLoading={privDeleteLoading}
        handleUpdatePrivilege={handleUpdatePrivilege}
        updatePrivLoading={updatePrivLoading}
      />
    </div>
  );
};

export default ProvideAR;
