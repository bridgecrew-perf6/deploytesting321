import { BsFolder, BsFileEarmark, BsGraphUp } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { AiFillSecurityScan, AiOutlineUser } from "react-icons/ai";
import {
  FaStickyNote,
  FaUser,
  FaUserSlash,
  FaUserEdit,
  FaUserAlt,
} from "react-icons/fa";
import { HiUserRemove, HiTemplate, HiUserGroup } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { v4 } from "uuid";

const adminData = [
  {
    _id: v4(),
    name: "Internal User Management (IUM)",
    active: true,
    selected: true,
    icon: <FaUserAlt style={{ marginTop: "-0.25rem" }} />,
  },
  {
    _id: v4(),
    name: "Access Rights",
    active: true,
    selected: false,
    icon: <BsFolder style={{ marginTop: "-0.25rem" }} />,
    subCategory: [
      {
        _id: v4(),
        name: "Provide user rights",
        active: false,
        selected: false,
        icon: <RiAdminFill style={{ marginTop: "-0.35rem" }} />,
      },
      {
        _id: v4(),
        name: "Remove access rights",
        active: false,
        selected: false,
        icon: <FaUserEdit style={{ marginTop: "-0.35rem" }} />,
      },
      {
        _id: v4(),
        name: "Edit access rights",
        active: false,
        selected: false,
        icon: (
          <HiUserRemove
            style={{ marginTop: "-0.35rem", marginLeft: "-0.1rem" }}
            size={17}
          />
        ),
      },
    ],
  },
  {
    _id: v4(),
    name: "Moderation",
    active: true,
    selected: false,
    icon: <BsFolder style={{ marginTop: "-0.25rem" }} />,
    subCategory: [
      {
        _id: v4(),
        name: "Content",
        active: false,
        selected: false,
        icon: <FaStickyNote style={{ marginTop: "-0.35rem" }} />,
      },
      {
        _id: v4(),
        name: "Users",
        active: false,
        selected: false,
        icon: <FaUser style={{ marginTop: "-0.25rem" }} />,
      },
    ],
  },
  {
    _id: v4(),
    name: "Security",
    active: true,
    selected: false,
    icon: (
      <AiFillSecurityScan
        style={{ marginTop: "-0.25rem", marginLeft: "-0.1rem" }}
        size={17}
      />
    ),
    subCategory: [
      {
        _id: v4(),
        name: "Blocked Users",
        active: false,
        selected: false,
        icon: <FaUserSlash style={{ marginTop: "-0.35rem" }} />,
      },
      {
        _id: v4(),
        name: "Flagged Users",
        active: false,
        selected: false,
        icon: <BsFileEarmark style={{ marginTop: "-0.35rem" }} />,
      },
    ],
  },
  {
    _id: v4(),
    name: "Metrics",
    active: false,
    selected: false,
    icon: <BsGraphUp style={{ marginTop: "-0.25rem" }} />,
  },
  {
    _id: v4(),
    name: "Templates",
    active: false,
    selected: false,
    icon: (
      <HiTemplate
        style={{ marginTop: "-0.25rem", marginLeft: "-0.1rem" }}
        size={17}
      />
    ),
    subCategory: [
      {
        _id: v4(),
        name: "Email",
        active: false,
        selected: false,
        icon: <MdEmail style={{ marginTop: "-0.25rem" }} />,
      },
      {
        _id: v4(),
        name: "Site",
        active: false,
        selected: false,
        icon: <BsGraphUp style={{ marginTop: "-0.25rem" }} />,
      },
      {
        _id: v4(),
        name: "Pop-Ups",
        active: false,
        selected: false,
        icon: <BsGraphUp style={{ marginTop: "-0.25rem" }} />,
      },
    ],
  },
  {
    _id: v4(),
    name: "User Groups",
    active: false,
    selected: false,
    icon: (
      <HiUserGroup
        style={{ marginTop: "-0.25rem", marginLeft: "-0.1rem" }}
        size={17}
      />
    ),
  },
];

export default adminData;
