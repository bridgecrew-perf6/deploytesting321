import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ButtonCustomWidth, SimpleTable } from "_pageComponents/index";
import userRightsStyles from "../../../../../appStyles/adminStyles/userRightsStyles.module.css";
import GraphResolvers from "../../../../../lib/apollo/apiGraphStrings";
import _ from "lodash";
import RoleActionModal from "./RoleActionModal";
import PrivilagesModal from "./PrivilagesModal";
import CreateRoleModal from "./CreateRoleModal";
import { privilages } from "_components/index";

const { GET_ALL_ROLES } = GraphResolvers.queries;

interface rolesType {
  name: string;
  description: string;
  status: string;
  action: any;
  privilages: string[];
}

const ProvideAR = () => {
  const { data, refetch, loading, error } = useQuery(GET_ALL_ROLES);
  const [rolesdata, setRolesData] = useState<rolesType[]>([]);
  const [showRoleActionModal, setShowRoleActionModal] = useState(false);
  const [roleLabelOnModal, setRoleLabelOnModal] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [showPrivModal, setShowPrivModal] = useState(false);
  const [selectedRoleValue, setSelectedROleValue] = useState({});
  const [privilagesData, setPrivilagesData] = useState(privilages);
  const [roleData, setRoleData] = useState({
    name: "",
    description: "",
  });
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
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
        dataField: "name",
        text: "Name",
        sort: true,
        events: {
          onClick: (
            e: any,
            column: any,
            columnIndex: number,
            row: any,
            rowIndex: number
          ) => {
            setSelectedRole(row.name);
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
        events: {
          onClick: (
            e: any,
            column: any,
            columnIndex: number,
            row: any,
            rowIndex: number
          ) => {
            if (row.status === false) {
              setRoleLabelOnModal("Activate");
              setSelectedRole(row.name);
              handleRoleModal();
            } else {
              setRoleLabelOnModal("Deactivate");
              setSelectedRole(row.name);
              handleRoleModal();
            }
          },
        },
      },
    ],
  };
  console.log(rolesdata);

  const handleRolePrivilages = (row: any) => {
    // console.log(row);
    setSelectedROleValue(row);
    setShowPrivModal(true);
  };

  const handleUpdatePrivilages = async () => {
    console.log(selectedRole);
    let validatedPrivilages: any = [];
    privilagesData.map((pd: any) => {
      if (pd.active === true) {
        validatedPrivilages.push(pd.name);
      }
    });
    console.log(validatedPrivilages);
    await updateRolePrivilages({
      variables: { roleName: selectedRole, privilages: validatedPrivilages },
    });
    setShowPrivModal(false);
  };

  const handleCreateNewRole = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Creating new role");
    await createNewRole({
      variables: {
        name: roleData.name,
        description: roleData.description,
        status: true,
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
  };

  const activateRoleFunction = async () => {
    console.log("Activating");
    await activateRole({
      variables: { roleName: selectedRole },
    });
    setShowRoleActionModal(false);
  };

  const disableRoleFunction = async () => {
    console.log("I am here");
    console.log("Disabling");
    await disableRole({
      variables: { roleName: selectedRole },
    });
    setShowRoleActionModal(false);
  };

  useEffect(() => {
    if (error) throw new Error(error.message);
    if (!loading && data) {
      let roles: rolesType[] = [];
      data?.allRoles.map((r: any) => {
        roles.push({
          name: r.name,
          description: r.description,
          status: r.status,
          action: r.status ? (
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
          privilages: r.privilages,
        });
      });
      let uniq = _.uniqBy(roles, (x) => x.name);
      setRolesData(uniq);
    }
  }, [data, loading]);

  return (
    <div className={userRightsStyles.userRightsWrapper}>
      <h1>Access Rights</h1>
      <div style={{ marginTop: "1rem" }}></div>
      <ButtonCustomWidth
        height="2.5rem"
        width="8rem"
        type="text"
        onClick={handleCreateModal}
        title="Create new role"
      />
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
      <PrivilagesModal
        showPrivModal={showPrivModal}
        setShowPrivModal={setShowPrivModal}
        handleCloseRoleModal={handleCloseRoleModal}
        selectedRole={selectedRole}
        handleUpdatePrivilages={handleUpdatePrivilages}
        selectedRoleValue={selectedRoleValue}
        loadingD={loadingD}
        privilagesData={privilagesData}
        setPrivilagesData={setPrivilagesData}
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
    </div>
  );
};

export default ProvideAR;
