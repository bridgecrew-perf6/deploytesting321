import React, { useState } from "react";
import Select from "react-select";
import usersInfoBox from "../../../../appStyles/adminStyles/usersInfoBox.module.css";

const SelectPagination = (props: any) => {
  const { handlePagination, options, pageValue } = props;

  const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  console.log(pageValue);

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
    handlePagination(parseInt(newValue.value));
  };

  return (
    <div className={usersInfoBox.adminTablePagination}>
      <Select
        value={options.filter((op: any, index: any) => {
          return op.value === pageValue;
        })}
        id="select pagination"
        inputId="select pagination"
        instanceId="select pagination"
        options={options}
        defaultValue={options[0]}
        formatGroupLabel={formatGroupLabel}
        onChange={handleChange}
      />
    </div>
  );
};

export default SelectPagination;
