import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";

const Table = (props: any) => {
  const { columndata, usersdata, changetablerowdata } = props;

  const tableRowEvents = {
    onClick: (e: any, row: any, rowIndex: number) => {
      changetablerowdata(row, rowIndex);
    },
  };

  return (
    <BootstrapTable
      rowStyle={{ height: "20px", padding: "5px 0" }}
      keyField="id"
      rowEvents={tableRowEvents}
      data={usersdata}
      columns={columndata.columns}
    />
  );
};

export default Table;
