import React, { useEffect, useRef, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";
import {
  AdminButton,
  ButtonCustomWidth,
  SelectPagination,
  ToPdf,
} from "_pageComponents/index";
import usersInfoBox from "../../../../appStyles/adminStyles/usersInfoBox.module.css";
import { useReactToPrint } from "react-to-print";
import paginationFactory from "react-bootstrap-table2-paginator";
import { exportFile, SelectedRow } from "_components/index";
import _ from "lodash";

const Table: React.FC<{
  columndata: any;
  usersdata: [];
  changetablerowdata: Function;
  selectedRows: SelectedRow[];
  setSelectedRows: Function;
  handleSelectedRowsActive: Function;
  handleSelectedRowsDisable: Function;
}> = (props) => {
  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const [exportButton, setExportButton] = useState(false);
  let componentRef = useRef<any>(null);

  const {
    columndata,
    usersdata,
    changetablerowdata,
    selectedRows,
    setSelectedRows,
    handleSelectedRowsActive,
    handleSelectedRowsDisable,
  } = props;

  const customTotal = (from: number, to: number, size: number) => (
    <span className="react-bootstrap-table-pagination-total">
      <span style={{ marginLeft: "1rem" }}>
        Showing {from} to {to} of {size} Results
      </span>
    </span>
  );

  const optionsPagination = [
    {
      value: "10",
      label: "10",
    },
    {
      value: "25",
      label: "25",
    },
    {
      value: "50",
      label: "50",
    },
    {
      value: "100",
      label: "100",
    },
    {
      value: "200",
      label: "200",
    },
  ];

  const options = {
    paginationSize: 5,
    pageStartIndex: 1,
    alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "25",
        value: 25,
      },
      {
        text: "50",
        value: 50,
      },
      {
        text: "100",
        value: 100,
      },
      {
        text: "200",
        value: 200,
      },
      {
        text: "All",
        value: usersdata?.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  const getPageMargins = () => {
    return `@page { margin: ${`3rem`} ${`1rem`} ${`3rem`} ${`1rem`} !important; }`;
  };

  const tableRowEvents = {
    onClick: (e: any, row: SelectedRow, rowIndex: number) => {
      console.log(row);
      changetablerowdata(row, rowIndex);
    },
  };

  const MyExportCSV = (props: exportFile) => {
    const handleClick = () => {
      props.onExport();
      setExportButton(false);
    };
    return (
      <div style={{ paddingRight: "1rem" }}>
        <ButtonCustomWidth
          width="10rem"
          height="3rem"
          onClick={handleClick}
          title="Export to CSV"
          type="text"
        />
      </div>
    );
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: () => getPageMargins(),
    onAfterPrint: () => setExportButton(false),
  });

  return (
    <div>
      <ToolkitProvider
        bootstrap4
        keyField="email"
        data={usersdata}
        columns={columndata}
        exportCSV={{
          fileName: "Internal Users.csv",
          onlyExportFiltered: true,
          exportAll: false,
        }}
        search
      >
        {(props) => (
          <div>
            <div className={usersInfoBox.tableUtilitiesWrapper}>
              <SearchBar
                {...props.searchProps}
                style={{ width: "100%", height: "40px", marginTop: 10 }}
              />
              <div
                className={
                  usersInfoBox.usersInfoBox__userActiveDisableButtonWrapper
                }
              >
                <AdminButton
                  style={{ boxShadow: "none" }}
                  module="disable"
                  title="Activate"
                  onClick={handleSelectedRowsActive}
                />
                <AdminButton
                  style={{ boxShadow: "none" }}
                  module="disable"
                  title="Disable"
                  onClick={handleSelectedRowsDisable}
                />
              </div>
            </div>
            <BootstrapTable
              {...props.baseProps}
              pagination={paginationFactory(options)}
              ref={componentRef}
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
                  if (isSelect) {
                    setSelectedRows((selectedRows: []) => [
                      ...selectedRows,
                      row,
                    ]);
                  } else {
                    let selected = selectedRows.filter((s: SelectedRow) => {
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
            {!exportButton && (
              <div style={{ margin: "1rem 0rem" }}>
                <ButtonCustomWidth
                  type="text"
                  width="10rem"
                  height="3rem"
                  onClick={() => setExportButton(true)}
                  title="Export"
                />
              </div>
            )}

            {exportButton && (
              <div
                style={{
                  display: "flex",
                  margin: "1rem 0rem",
                }}
              >
                <MyExportCSV {...props.csvProps}>Export CSV!!</MyExportCSV>
                <ButtonCustomWidth
                  width="10rem"
                  height="3rem"
                  type="text"
                  onClick={handlePrint}
                  title="Print this out!"
                />
              </div>
            )}
          </div>
        )}
      </ToolkitProvider>
    </div>
  );
};

export default Table;
