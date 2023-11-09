import type {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { type UserValidationType } from "~/validation/member";
export type PropsType = {
  register: UseFormRegister<UserValidationType>;
  errors: FieldErrors<UserValidationType>;
  getValues?: UseFormGetValues<UserValidationType>;
  watch?: UseFormWatch<UserValidationType>;
  setValue?: UseFormSetValue<UserValidationType>;
};
