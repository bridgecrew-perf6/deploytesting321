import React, { useEffect, useState } from "react";
import usersInfoBox from "../../../appStyles/adminStyles/usersInfoBox.module.css";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import { useMutation, useQuery } from "@apollo/client";
import _ from "lodash";
import {
  AdminButton,
  IsActiveModal,
  Table,
  UserUpdateModel,
} from "_pageComponents/index";
import { updateInternalUserProfile } from "../../../lib/apollo/apolloFunctions";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import {
  adminUserDataForm,
  emailValidation,
  SelectedRow,
  validationErrorsAdmin,
} from "_components/index";

const {
  GET_INTERNAL_USERS,
  GET_INTERNAL_USERS_WITH_PAGINATION,
  GET_ALL_ROLES,
} = GraphResolvers.queries;

export interface Roles {
  _id: string;
  value: string;
  label: string;
  isDisabled: boolean;
}

const UsersInfo = () => {
  const [pagination, setPagination] = useState({
    pageStartIndex: 0,
    pageEndIndex: 10,
  });
  // const { data, refetch, loading, error } = useQuery(GET_INTERNAL_USERS);
  const { data, refetch, loading, error } = useQuery(GET_INTERNAL_USERS);

  const {
    data: dataR,
    loading: loadingR,
    error: errorR,
  } = useQuery(GET_ALL_ROLES);

  const [roles, setRoles] = useState<Roles[]>([]);
  const [usersData, setUsersData] = useState<[]>([]);
  const [selectedRows, setSelectedRows] = useState<SelectedRow[]>([]);
  const [showUserEditModal, setShowUserEditModal] = useState(false);
  const [modelWorkingFor, setModelWorkingFor] = useState("updateUser");
  const [showActiveModal, setShowActiveModal] = useState(false);
  const [showActiveModalLabel, setShowActiveModalLabel] = useState("");
  const [validationErrors, setValidationErrors] =
    useState<validationErrorsAdmin>({
      emailErr: "",
      passwordErr: "",
    });
  const [updateInternalUser, { loading: loadingUpdateUser }] = useMutation(
    GraphResolvers.mutations.UPDATE_INTERNAL_USER,
    {
      refetchQueries: [
        {
          query: GET_INTERNAL_USERS,
        },
      ],
    }
  );
  const [createNewInternalUser, { loading: loadingCreateUser, error: errorA }] =
    useMutation(GraphResolvers.mutations.CREATE_INTERNAL_USER, {
      refetchQueries: [
        {
          query: GET_INTERNAL_USERS,
        },
      ],
    });

  const [updateActiveUsersToDisable, { loading: loadingb, error: errorb }] =
    useMutation(GraphResolvers.mutations.UPDATE_ACTIVE_USERS_TO_DISABLE, {
      refetchQueries: [
        {
          query: GET_INTERNAL_USERS,
        },
      ],
    });

  const [updateDisableUsersToActive, { loading: loadingc, error: errorc }] =
    useMutation(GraphResolvers.mutations.UPDATE_DISABLE_USERS_TO_ACTIVE, {
      refetchQueries: [
        {
          query: GET_INTERNAL_USERS,
        },
      ],
    });

  const tableSelectOptions = {
    0: "true",
    1: "false",
  };
  let isActiveFilter;
  const columnData = {
    columns: [
      {
        dataField: "_id",
        text: "ID",
        searchable: false,
        hidden: true,
        sort: true,
      },
      {
        dataField: "fullName",
        text: "Full Name",
        sort: true,
        style: {
          cursor: "pointer",
        },
      },
      {
        dataField: "email",
        text: "Email Address",
        sort: true,
      },
      {
        dataField: "accessRole",
        text: "Access Role",
        sort: true,
      },
      {
        dataField: "jobTitle",
        text: "Job Type",
        sort: true,
      },
      {
        dataField: "isActive",
        text: "Active",
        sort: true,
        filter: textFilter({
          getFilter: (filter) => {
            isActiveFilter = tableSelectOptions;
          },
        }),
      },
    ],
  };
  const [userDataForm, setUserDataForm] = useState<adminUserDataForm>({
    _id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    homeAddress: "",
    jobTitle: "",
    accessRole: {
      value: "",
      _id: "",
    },
    groups: "",
    lastSignIn: "",
    isActive: false,
  });

  useEffect(() => {
    if (error) throw new Error(error.message);
    if (!loading && data) {
      let updatedUser: any = [];
      data?.internalUsers?.map((dR: any) => {
        updatedUser.push({
          _id: dR._id,
          accessRole: dR.accessRole?.role || null,
          accessRoleId: dR.accessRole?._id || null,
          email: dR.email,
          fullName: dR.fullName,
          isActive: dR.isActive,
          accessRoleStatus: dR.accessRole?.status || null,
          accessRolePrivileges: dR.accessRole?.privileges || null,
          jobTitle: dR.jobTitle,
        });
      });
      let uniq: any = _.uniqBy(updatedUser, (x: any) => x.email);
      setUsersData(uniq);
    }
  }, [loading, data]);

  useEffect(() => {
    if (errorR) throw new Error(errorR.message);
    if (!loadingR && dataR) {
      let allroles: any = [];
      dataR.allRoles.map((dR: any) => {
        allroles.push({
          _id: dR._id,
          value: dR.role,
          label: dR.role,
          isDisabled: dR.status ? false : true,
        });
      });
      let uniq = _.uniqBy(allroles, (x: any) => x.label);
      setRoles(uniq);
    }
  }, [dataR]);

  const changeTableRowData = (row: SelectedRow, rowIndex: number) => {
    setModelWorkingFor("updateUser");
    setShowUserEditModal(true);
    setUserDataForm({
      ...userDataForm,
      _id: row?._id || "",
      fullName: row?.fullName || "",
      email: row?.email || "",
      jobTitle: row?.jobTitle || "",
      accessRole: {
        value: row?.accessRole || "",
        _id: row?.accessRoleId || "",
      },
      isActive: row?.isActive,
    });
  };

  const handleAddNewUser = () => {
    setModelWorkingFor("newUser");
    setShowUserEditModal(true);
    setUserDataForm({
      ...userDataForm,
      _id: "",
      fullName: "",
      email: "",
      jobTitle: "",
      accessRole: {
        value: "",
        _id: "",
      },
      isActive: false,
    });
  };

  const handleSubmitUsersData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = emailValidation(userDataForm.email);
    if (errors === false) {
      setValidationErrors({
        ...validationErrors,
        emailErr: "Not a valid Email",
      });
    } else {
      const formInputs = {
        id: userDataForm._id,
        fullName: userDataForm.fullName,
        email: userDataForm.email,
        jobTitle: userDataForm.jobTitle,
        accessRole: userDataForm.accessRole,
        isActive: userDataForm.isActive,
      };
      if (modelWorkingFor === "updateUser") {
        await updateInternalUser({
          variables: { formInputs: JSON.stringify(formInputs) },
        });
        setShowUserEditModal(false);
      } else {
        await createNewInternalUser({
          variables: { formInputs: JSON.stringify(formInputs) },
        });
        setShowUserEditModal(false);
      }
    }
  };

  const showActiveUsersData = () => (
    <div className={usersInfoBox.userInfoBox__adminTableWrapper}>
      {loading && usersData?.length === 0 ? (
        <h3>Loading...</h3>
      ) : (
        <Table
          changetablerowdata={changeTableRowData}
          usersdata={usersData}
          columndata={columnData.columns}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          handleSelectedRowsDisable={handleSelectedRowsDisable}
          handleSelectedRowsActive={handleSelectedRowsActive}
        />
      )}
    </div>
  );

  const handleSelectedRowsActive = async () => {
    if (selectedRows.length > 0) {
      setShowActiveModal(true);
      setShowActiveModalLabel("Are you sure to Activate selected Users ?");
    } else {
      return alert("Please select any User!");
    }
  };

  // to bulk disable active users
  const handleSelectedRowsDisable = async () => {
    if (selectedRows.length > 0) {
      setShowActiveModal(true);
      setShowActiveModalLabel("Are you sure to Disable selected Users ?");
    } else {
      return alert("Please select any User!");
    }
  };

  // to bulk active active users
  const updateUsersToActive = async () => {
    await Promise.all(
      selectedRows.map(async (s: SelectedRow) => {
        await updateDisableUsersToActive({
          variables: { userId: s._id },
        });
      })
    ).then(() => console.log("Updated to Active"));
    setShowActiveModal(false);
  };

  // to bulk disable active users
  const updateUsersToDisable = async () => {
    await Promise.all(
      selectedRows.map(async (s: SelectedRow) => {
        await updateActiveUsersToDisable({
          variables: { userId: s._id },
        });
      })
    ).then(() => console.log("Updated to disable"));
    setShowActiveModal(false);
  };

  const handleCloseIsActiveModal = () => {
    setShowActiveModal(false);
  };

  const handleCLoseModal = () => {
    setShowUserEditModal(false);
  };

  return (
    <div className={usersInfoBox.usersInfoWrapper}>
      <div className={usersInfoBox.userInfoBox__btnWrapper}>
        <div className={usersInfoBox.userInfoBox__menuTitleWrapper}>
          <AdminButton
            title="IUM (Internal User Management)"
            module="menuTitle"
          />
        </div>
        <AdminButton
          title="Add new user"
          style={{ width: "250px" }}
          onClick={handleAddNewUser}
        />
      </div>
      {showActiveUsersData()}
      <UserUpdateModel
        handleCLoseModal={handleCLoseModal}
        handleSubmitUsersData={handleSubmitUsersData}
        validationErrors={validationErrors}
        setValidationErrors={setValidationErrors}
        setUserDataForm={setUserDataForm}
        userDataForm={userDataForm}
        showUserEditModal={showUserEditModal}
        userRoles={roles}
        setShowUserEditModal={setShowUserEditModal}
        loadingA={loadingCreateUser}
        loadingB={loadingUpdateUser}
      />
      <IsActiveModal
        showActiveModal={showActiveModal}
        setShowActiveModal={setShowActiveModal}
        handleCloseIsActiveModal={handleCloseIsActiveModal}
        showActiveModalLabel={showActiveModalLabel}
        updateUsersToActive={updateUsersToActive}
        updateUsersToDisable={updateUsersToDisable}
        loadingb={loadingb}
        loadingc={loadingc}
      />
    </div>
  );
};

export default UsersInfo;
