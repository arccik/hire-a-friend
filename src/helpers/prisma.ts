import { type Prisma } from "@prisma/client";
import { type FriendFilterSchemaType } from "~/validation/filter";
// import languageList from "~/data/language-list.json";

export const hideFieldsFromClient = (fields: Prisma.UserFieldRefs) => {
  const selectedFields = Object.keys({ ...fields }).filter(
    (v) =>
      ![
        "password",
        "city",
        "email",
        "phoneNumber",
        "updatedAt",
        "zipCode",
      ].includes(v),
  );
  const select: Record<string, boolean> = {};
  for (const field of selectedFields) {
    select[field] = true;
  }
  return select;
};

export const generateFilterOptions = (
  input: FriendFilterSchemaType,
  id?: string,
) => {
  const options: Record<string, string | boolean | object | null> = {};

  if (!!input.status) options.status = input.status;
  if (input.activities?.has && input.activities.has !== "null") {
    options.activities = input.activities;
  } else {
    delete options.activities;
  }
  if (input.gender && input.gender !== "null") {
    options.gender = input.gender;
  }
  if (input.languages?.has && input.languages.has !== "null") {
    options.languages = input.languages;
  } else {
    delete options.languages;
  }
  if (input.city && input.city !== "null") {
    options.city = input.city;
  } else {
    delete options.city;
  }
  // hide signed in user from the dispaly list
  id && (options.id = { not: id });

  const pageSize = 9;
  const skip = (input.page - 1) * pageSize;
  const take = pageSize;
  options.userType = "Friend";
  options.activated = true;

  return { options, skip, take };
};


