import React from "react";
import { backdrop } from "../../../appStyles/backdrop.module.css";

export default function Backdrop({ toggle }) {
  return <div className={`${backdrop}`} onClick={() => toggle(false)} />;
}
