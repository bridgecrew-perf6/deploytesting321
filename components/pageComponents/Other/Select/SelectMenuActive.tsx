import React, { useEffect, useState } from "react";
import Select from "react-select";
import { adminUserDataForm } from "_components/index";
import usersInfoBox from "../../../../appStyles/adminStyles/usersInfoBox.module.css";

const SelectMenuActive: React.FC<{
  activeOptions: {
    value: boolean;
    label: string;
  }[];
  selectedValue: boolean;
  userDataForm: adminUserDataForm;
  setUserDataForm: Function;
}> = (props) => {
  const { activeOptions, selectedValue, userDataForm, setUserDataForm } = props;

  const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const formatGroupLabel = () => (
    <div style={groupStyles}>
      <span>{"isActive"}</span>
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
        {activeOptions.length}
      </span>
    </div>
  );

  const handleChangeActive = (newValue: any, actionMeta: any) => {
    console.group("Value Changed");
    setUserDataForm({ ...userDataForm, isActive: newValue.value });
    console.groupEnd();
  };

  return (
    <div className={usersInfoBox.adminInputField}>
      <Select
        options={activeOptions}
        value={activeOptions.filter((op: any, index: any) => {
          return op.value === selectedValue;
        })}
        defaultValue={activeOptions[1]}
        formatGroupLabel={formatGroupLabel}
        onChange={handleChangeActive}
      />
    </div>
  );
};

export default SelectMenuActive;
