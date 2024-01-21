import { Card } from "@nextui-org/react";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import MemberForm from "../../components/form/MemberForm";
import DisplayError from "~/components/features/DisplayError";
import CustomerForm from "~/components/form/CustomerForm";
import Loader from "~/components/features/Loader";
import type { Appearance, User } from "@prisma/client";

export default function UpdateProfile() {
  const { data: userSession } = useSession({ required: true });
  const userId = userSession?.user.id;
  const { data: user, status } = api.user.getOne.useQuery(
    { id: userId! },
    { enabled: !!userId },
  );

  if (status === "loading" || !userId || !user) return <Loader />;
  if (status === "error") return <DisplayError />;

  function renderProfileForm(
    userType: string,
    user: User & { appearance: Appearance | null },
    userId: string,
  ) {
    if (userType === "Friend") {
      return <MemberForm {...user} userId={userId} />;
    } else {
      const { age, city, image, name, about, experties } = user;
      return (
        <CustomerForm
          age={age}
          city={city}
          image={image}
          name={name}
          about={about}
          experties={experties}
        />
      );
    }
  }

  return (
    <main className="container mx-auto">
      <Card fullWidth className="p-4">
        {user.userType && renderProfileForm(user.userType, user, userId)}
      </Card>
    </main>
  );
}
