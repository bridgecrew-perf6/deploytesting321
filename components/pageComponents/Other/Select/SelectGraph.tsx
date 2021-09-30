// import React, { useEffect, useState } from "react";
// import Select from "react-select";
// import usersInfoBox from "../../../../appStyles/adminStyles/usersInfoBox.module.css";

// const SelectGraph = (props: any) => {
//   const { onChange, defaultValue, options, setUserDataForm } = props;

//   const groupStyles = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//   };

//   const formatGroupLabel = () => (
//     <div style={groupStyles}>
//       <span>{"isActive"}</span>
//       <span
//         style={{
//           backgroundColor: "#EBECF0",
//           borderRadius: "2em",
//           color: "#172B4D",
//           display: "inline-block",
//           fontSize: 12,
//           fontWeight: "normal",
//           lineHeight: "1",
//           minWidth: 1,
//           padding: "0.16666666666667em 0.5em",
//           textAlign: "center",
//         }}
//       >
//         {options.length}
//       </span>
//     </div>
//   );

//   return (
//     <div className={usersInfoBox.adminInputField}>
//       <Select
//         options={options}
//         defaultValue={defaultValue}
//         formatGroupLabel={formatGroupLabel}
//         onChange={onChange}
//       />
//     </div>
//   );
// };

// export default SelectGraph;
