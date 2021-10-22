import React from "react";

export const ParaCustom = (props: any) => {
  return (
    <p style={{ paddingTop: props.paddingTop, margin: 0, fontSize: "14px" }}>
      {props.text}
    </p>
  );
};
