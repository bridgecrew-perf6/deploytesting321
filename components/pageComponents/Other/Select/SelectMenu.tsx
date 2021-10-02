import React, { useEffect, useState } from "react";
import Select from "react-select";
import { adminUserDataForm } from "_components/index";
import usersInfoBox from "../../../../appStyles/adminStyles/usersInfoBox.module.css";

const SelectMenu: React.FC<{
  options: {
    _id: string;
    value: string;
    label: string;
    isDisabled: boolean;
  }[];
  selectedValue: string;
  userDataForm: adminUserDataForm;
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
    console.group("Value Changed");
    console.log(newValue);
    setUserDataForm({ ...userDataForm, accessRole: newValue.value });
    console.groupEnd();
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
