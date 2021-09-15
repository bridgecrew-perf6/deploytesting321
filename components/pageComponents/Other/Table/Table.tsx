import React, { useState } from 'react'
import BootstrapTable from "react-bootstrap-table-next";


const Table = (props: any) => {
    const { columndata, usersdata } = props;
    return (
        <BootstrapTable
            rowStyle={{ height: '20px', padding: '5px 0' }}
            keyField="id"
            data={usersdata}
            columns={columndata.columns}
        />
    )
}

export default Table
