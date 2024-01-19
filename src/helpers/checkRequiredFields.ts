import { User } from "@prisma/client";

export default function checkRequiredFields(data: User) {
  return !data?.name || !data?.age || !data?.image || !data?.activities.length;
}
