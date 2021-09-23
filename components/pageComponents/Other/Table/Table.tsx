import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";
import { AdminButton } from "_pageComponents/index";
import usersInfoBox from "../../../../appStyles/adminStyles/usersInfoBox.module.css";

const Table = (props: any) => {
  const { SearchBar } = Search;

  const {
    columndata,
    usersdata,
    changetablerowdata,
    selectedRows,
    setSelectedRows,
    handleSelectedRowsActive,
    handleSelectedRowsDisable,
  } = props;

  const tableRowEvents = {
    onClick: (e: any, row: any, rowIndex: number) => {
      changetablerowdata(row, rowIndex);
    },
  };

  return (
    <div>
      <ToolkitProvider
        bootstrap4
        keyField="email"
        data={usersdata}
        columns={columndata}
        search
      >
        {(props) => (
          <div>
            <h5>Search in Table</h5>
            <div className={usersInfoBox.tableUtilitiesWrapper}>
              <SearchBar
                {...props.searchProps}
                style={{ width: "300px", height: "40px", marginTop: 10 }}
              />
              <div
                className={
                  usersInfoBox.usersInfoBox__userActiveDisableButtonWrapper
                }
              >
                <AdminButton
                  style={{ boxShadow: "none" }}
                  module="active"
                  title="Active"
                  onClick={handleSelectedRowsActive}
                />
                <AdminButton
                  style={{ boxShadow: "none" }}
                  module="active"
                  title="Disable"
                  onClick={handleSelectedRowsDisable}
                />
              </div>
            </div>
            <BootstrapTable
              {...props.baseProps}
              rowStyle={{
                height: "20px",
                padding: "5px 20px",
                wordWrap: "break-word",
              }}
              rowEvents={tableRowEvents}
              striped
              hover
              selectRow={{
                mode: "checkbox",
                onSelect: (row, isSelect, rowIndex, e) => {
                  console.log(row, isSelect, rowIndex);
                  if (isSelect) {
                    setSelectedRows((selectedRows: []) => [
                      ...selectedRows,
                      row,
                    ]);
                  } else {
                    let selected = selectedRows.filter((s: any) => {
                      return s._id !== row._id;
                    });
                    setSelectedRows(selected);
                  }
                },
                onSelectAll: (isSelect, rows, e) => {
                  console.log(rows);
                  if (isSelect) {
                    setSelectedRows(rows);
                  } else {
                    setSelectedRows([]);
                  }
                },
              }}
              tabIndexCell
              filter={filterFactory()}
            />
          </div>
        )}
      </ToolkitProvider>
    </div>
  );
};

export default Table;
