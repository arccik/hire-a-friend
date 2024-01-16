import { Card } from "@nextui-org/react";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import MemberForm from "../../components/form/MemberForm";
import DisplayError from "~/components/features/DisplayError";
import CustomerForm from "~/components/form/CustomerForm";
import Loader from "~/components/features/Loader";

export default function UpdateProfile() {
  const { data: userSession } = useSession({ required: true });
  const { data: user, status } = api.user.getOne.useQuery(
    { id: userSession?.user.id ?? "" },
    { enabled: !!userSession?.user },
  );

  if (status === "loading") return <Loader />;

  if (status === "error") return <DisplayError />;

  return (
    <main>
      <section className="flex flex-col items-center justify-center p-4">
        <Card fullWidth className="p-4 md:p-10">
          {user?.userType === "Friend" && userSession?.user?.id ? (
            <MemberForm {...user} userId={userSession.user.id} />
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
