import React from "react";
import { dropDownCtr } from "../../../appStyles/appStyles.module.css";

export default function AppDropdown() {
  // let drawerClass = `${sideDrawer}`;

  // if(show){
  //   drawerClass = `${sideDrawer} ${sideDrawerOpen}`
  // }

  return (
    <div
      className={`dropdown-menu ${dropDownCtr}`}
      aria-labelledby="siteDropDown"
    >
      <a class="dropdown-item" href="#">
        Action
      </a>
      <a class="dropdown-item" href="#">
        Another action
      </a>
      <a class="dropdown-item" href="#">
        Something else here
      </a>
    </div>

    // <div className={drawerClass}>
    //   <ul>
    //     <li>All Topics</li>
    //     <li>About</li>
    //     <li>How it Works</li>
    //     <li>Suggestions</li>
    //     <li>Support</li>
    //     <li>Settings</li>
    //   </ul>
    // </div>
  );
}
