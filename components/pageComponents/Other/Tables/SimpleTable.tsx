import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

const SimpleTable = (props: any) => {
  const { rolesdata, columndata } = props;

  return (
    <div>
      <BootstrapTable
        {...props.baseProps}
        bootstrap4
        keyField="role"
        data={rolesdata}
        columns={columndata}
        rowStyle={{
          height: "20px",
          padding: "5px 20px",
          wordWrap: "break-word",
        }}
        striped
        hover
      />
    </div>
  );
};

export default SimpleTable;
