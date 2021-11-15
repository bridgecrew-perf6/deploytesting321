import React from "react";

export const Text = (props: any) => {
  return (
    <p style={{ paddingTop: 7, margin: 0, fontSize: "14px" }}>{props.text}</p>
  );
};
