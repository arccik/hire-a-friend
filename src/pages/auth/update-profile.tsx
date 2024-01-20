import { Card } from "@nextui-org/react";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import MemberForm from "../../components/form/MemberForm";
import DisplayError from "~/components/features/DisplayError";
import CustomerForm from "~/components/form/CustomerForm";
import Loader from "~/components/features/Loader";

export default function UpdateProfile() {
  const { data: userSession } = useSession({ required: true });
  const userId = userSession?.user.id;
  const { data: user, status } = api.user.getOne.useQuery(
    { id: userId! },
    { enabled: !!userId },
  );

  if (status === "loading" || !userId || !user) return <Loader />;
  if (status === "error") return <DisplayError />;

  return (
    <main>
      <section className="flex flex-col items-center justify-center p-4">
        <Card fullWidth className="p-4 md:p-10">
          {user.userType === "Friend" ? (
            <MemberForm {...user} userId={userId} />
          ) : (
            <CustomerForm
              age={user?.age}
              city={user?.city}
              image={user?.image}
              name={user?.name}
              about={user?.about}
              experties={user?.experties}
            />
          )}
        </Card>
      </section>
    </main>
  );
}
