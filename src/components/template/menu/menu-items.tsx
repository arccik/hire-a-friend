import {
  FaUserFriends,
  FaInfo,
  FaMailBulk,
  FaFoursquare,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { MdOutlinePolicy } from "react-icons/md";

type MenuItem = {
  id: number;
  title: string;
  href: string;
  icon?: JSX.Element;
};

export const menuItems: MenuItem[] = [
  {
    id: 1,
    title: "Make Connections",
    href: "/profiles",
    icon: <FaUserFriends />,
  },
  {
    id: 2,
    title: "About Us",
    href: "/about-us",
    icon: <FaInfo />,
  },
  {
    id: 3,
    title: "Contact Us",
    href: "/contact-us",
    icon: <FaMailBulk />,
  },
  {
    id: 4,
    title: "Terms & conditions",
    href: "/docs/terms-and-conditions",
    icon: <FaFoursquare />,
  },
  {
    id: 5,
    title: "Privacy Policy",
    href: "/docs/privacy-policy",
    icon: <MdOutlinePolicy />,
  },
  {
    id: 6,
    title: "FAQ",
    href: "/help-feedback",
    icon: <FaRegQuestionCircle />,
  },
];
