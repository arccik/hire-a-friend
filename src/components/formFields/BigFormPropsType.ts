import type {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from "react-hook-form";
import { type UserValidationType } from "~/validation/user-validation";
export type PropsType = {
  register: UseFormRegister<UserValidationType>;
  errors: FieldErrors<UserValidationType>;
  getValues?: UseFormGetValues<UserValidationType>;
};
