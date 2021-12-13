import React, { useEffect, useState } from "react";
import Select from "react-select";

import usersInfoBox from "../../../../appStyles/adminStyles/usersInfoBox.module.css";

const SelectMenu: React.FC<{
  options: {
    _id: string;
    value: string;
    label: string;
    isDisabled: boolean;
  }[];
  selectedValue: string;
  userDataForm: any;
  setUserDataForm: Function;
}> = (props: any) => {
  const { options, selectedValue, userDataForm, setUserDataForm } = props;

  const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const formatGroupLabel = () => (
    <div style={groupStyles}>
      <span>{"Access Roles"}</span>
      <span
        style={{
          backgroundColor: "#EBECF0",
          borderRadius: "2em",
          color: "#172B4D",
          display: "inline-block",
          fontSize: 12,
          fontWeight: "normal",
          lineHeight: "1",
          minWidth: 1,
          padding: "0.16666666666667em 0.5em",
          textAlign: "center",
        }}
      >
        {options.length}
      </span>
    </div>
  );

  const handleChange = (newValue: any, actionMeta: any) => {
    setUserDataForm({
      ...userDataForm,
      accessRole: {
        value: newValue.value,
        _id: newValue._id,
      },
    });
  };

  return (
    <div className={usersInfoBox.adminInputField}>
      <Select
        options={options}
        value={options.filter((op: any, index: any) => {
          return op.value === selectedValue;
        })}
        defaultValue={options[1]}
        formatGroupLabel={formatGroupLabel}
        onChange={handleChange}
      />
    </div>
  );
};

export default SelectMenu;
