import React, { useEffect, useState } from "react";
import usersInfoBox from "../../../appStyles/adminStyles/usersInfoBox.module.css";
import GraphResolvers from "../../../lib/apollo/apiGraphStrings";
import { useMutation, useQuery } from "@apollo/client";
import {
  AdminButton,
  IsActiveModal,
  Table,
  UserUpdateModel,
} from "_pageComponents/index";
import { updateInternalUserProfile } from "../../../lib/apollo/apolloFunctions";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

const { GET_INTERNAL_USERS, GET_INTERNAL_USERS_WITH_PAGINATION } =
  GraphResolvers.queries;

const UsersInfo = () => {
  const [pagination, setPagination] = useState({
    pageStartIndex: 0,
    pageEndIndex: 10,
  });
  // const { data, refetch, loading, error } = useQuery(GET_INTERNAL_USERS);
  const { data, refetch, loading, error } = useQuery(
    GET_INTERNAL_USERS_WITH_PAGINATION,
    {
      variables: {
        offset: pagination.pageStartIndex,
        limit: pagination.pageEndIndex,
      },
    }
  );

  const [usersData, setUsersData] = useState([]);
  const [selectedRows, setSelectedRows] = useState<[]>([]);
  const [showUserEditModal, setShowUserEditModal] = useState(false);
  const [modelWorkingFor, setModelWorkingFor] = useState("updateUser");
  const [showActiveModal, setShowActiveModal] = useState(false);
  const [showActiveModalLabel, setShowActiveModalLabel] = useState("");
  const [UpdateInternalUser] = useMutation(
    GraphResolvers.mutations.UPDATE_INTERNAL_USER,
    {
      refetchQueries: [{ query: GET_INTERNAL_USERS }],
    }
  );
  const [createNewInternalUser, { loading: loadingA, error: errorA }] =
    useMutation(GraphResolvers.mutations.CREATE_INTERNAL_USER, {
      refetchQueries: [
        {
          query: GET_INTERNAL_USERS_WITH_PAGINATION,
          variables: {
            offset: pagination.pageStartIndex,
            limit: pagination.pageEndIndex,
          },
        },
      ],
    });

  const [updateActiveUsersToDisable, { loading: loadingb, error: errorb }] =
    useMutation(GraphResolvers.mutations.UPDATE_ACTIVE_USERS_TO_DISABLE, {
      refetchQueries: [
        {
          query: GET_INTERNAL_USERS_WITH_PAGINATION,
          variables: {
            offset: pagination.pageStartIndex,
            limit: pagination.pageEndIndex,
          },
        },
      ],
    });

  const [updateDisableUsersToActive, { loading: loadingc, error: errorc }] =
    useMutation(GraphResolvers.mutations.UPDATE_DISABLE_USERS_TO_ACTIVE, {
      refetchQueries: [
        {
          query: GET_INTERNAL_USERS_WITH_PAGINATION,
          variables: {
            offset: pagination.pageStartIndex,
            limit: pagination.pageEndIndex,
          },
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
  const [userDataForm, setUserDataForm] = useState({
    _id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    homeAddress: "",
    jobTitle: "",
    accessRole: "",
    groups: "",
    lastSignIn: "",
    isActive: false,
  });
  const [pageValue, setPageValue] = useState("10");

  useEffect(() => {
    if (error) console.log("Error occured while fetching", error);
    if (!loading && data) setUsersData(data?.internalUsersWithPagination);
  }, [loading, data]);

  const changeTableRowData = (row: any, rowIndex: number) => {
    setModelWorkingFor("updateUser");
    setShowUserEditModal(true);
    setUserDataForm({
      ...userDataForm,
      _id: row?._id || "",
      fullName: row?.fullName || "",
      email: row?.email || "",
      jobTitle: row?.jobTitle || "",
      accessRole: row?.accessRole || "",
      isActive: row?.isActive,
    });
    console.log(row?.isActive);
  };

  const handleAddNewUser = () => {
    console.log("I am clicked");
    setModelWorkingFor("newUser");
    setShowUserEditModal(true);
    setUserDataForm({
      ...userDataForm,
      _id: "",
      fullName: "",
      email: "",
      jobTitle: "",
      accessRole: "",
      isActive: false,
    });
  };

  const handleSubmitUsersData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("I am clicked");
    const formInputs = {
      id: userDataForm._id,
      fullName: userDataForm.fullName,
      email: userDataForm.email,
      jobTitle: userDataForm.jobTitle,
      accessRole: userDataForm.accessRole,
      isActive: userDataForm.isActive,
    };
    if (modelWorkingFor === "updateUser") {
      console.log(modelWorkingFor);
      await updateInternalUserProfile(
        UpdateInternalUser,
        JSON.stringify(formInputs)
      );
      setShowUserEditModal(false);
    } else {
      await createNewInternalUser({
        variables: { formInputs: JSON.stringify(formInputs) },
      });
      setShowUserEditModal(false);
    }
  };

  const handlePagination = (number: number) => {
    setPagination({ ...pagination, pageEndIndex: number });
    setPageValue(number.toString());
  };

  const showActiveUsersData = () => (
    <div className={usersInfoBox.userInfoBox__adminTableWrapper}>
      {loading && usersData?.length > 0 ? (
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
          handlePagination={handlePagination}
          pageValue={pageValue}
        />
      )}
    </div>
  );

  const handleSelectedRowsActive = async () => {
    console.log(selectedRows);
    if (selectedRows.length > 0) {
      setShowActiveModal(true);
      setShowActiveModalLabel("Are you sure to Activate selected Users ?");
    } else {
      return alert("Please select any User!");
    }
  };

  // to bulk disable active users
  const handleSelectedRowsDisable = async () => {
    console.log(selectedRows);
    if (selectedRows.length > 0) {
      setShowActiveModal(true);
      setShowActiveModalLabel("Are you sure to Disable selected Users ?");
    } else {
      return alert("Please select any User!");
    }
  };

  // to bulk active active users
  const updateUsersToActive = async () => {
    console.log("I am here in active");
    await Promise.all(
      selectedRows.map(async (s: any) => {
        await updateDisableUsersToActive({
          variables: { userId: s._id },
        });
      })
    ).then(() => console.log("Updated to Active"));
    setShowActiveModal(false);
  };

  // to bulk disable active users
  const updateUsersToDisable = async () => {
    console.log("I am here in disable");
    await Promise.all(
      selectedRows.map(async (s: any) => {
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
        setUserDataForm={setUserDataForm}
        userDataForm={userDataForm}
        showUserEditModal={showUserEditModal}
        setShowUserEditModal={setShowUserEditModal}
        modelWorkingFor={modelWorkingFor}
        setModelWorkingFor={setModelWorkingFor}
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
