import { type UserValidationType } from "~/validation/member";
import { type FieldErrors, type UseFormSetValue } from "react-hook-form";

export type ImageUploadType = {
  setValue: UseFormSetValue<UserValidationType>;
  imgUrls: string[] | null;
  errors: FieldErrors<UserValidationType>;
};
