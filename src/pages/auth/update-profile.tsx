import { Card, Spinner } from "@nextui-org/react";
import MemberForm from "../../components/formFields/MemberForm";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import DisplayError from "~/components/features/DisplayError";
import ClientForm from "~/components/formFields/ClientForm";

export default function UpdateProfile() {
  const { data: userSession } = useSession({ required: true });
  const { data: user, status } = api.user.getOne.useQuery(
    { id: userSession?.user.id ?? "" },
    { enabled: !!userSession?.user },
  );

  if (status === "loading")
    return (
      <Spinner
        color="warning"
        className="mt-10 flex h-screen items-center align-middle"
      />
    );
  if (status === "error") return <DisplayError />;

  return (
    <section className="mx-auto flex flex-col items-center justify-center p-4">
      <Card fullWidth className="p-4 md:p-10">
        {user?.userType === "Friend" && userSession?.user?.id ? (
          <MemberForm {...user} userId={userSession.user.id} />
        ) : (
          <ClientForm name={user?.name} city={user?.city} image={user?.image} />
        )}
      </Card>
    </section>
  );
}
