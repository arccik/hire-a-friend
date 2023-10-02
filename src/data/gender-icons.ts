import { PiGenderNonbinaryBold } from "react-icons/pi";
import {
  BsGenderTrans,
  BsGenderMale,
  BsGenderFemale,
  BsIncognito,
} from "react-icons/bs";

export const genders = [
  {
    id: 1,
    name: "Male",
    Icon: BsGenderMale,
  },
  {
    id: 2,
    name: "Female",
    Icon: BsGenderFemale,
  },
  {
    id: 3,
    name: "Trans",
    Icon: BsGenderTrans,
  },
  {
    id: 4,
    name: "Non-binary",
    Icon: PiGenderNonbinaryBold,
  },
  {
    id: 5,
    name: "Other",
    Icon: BsIncognito,
  },
];
