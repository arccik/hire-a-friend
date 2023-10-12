import { Button, Card, Spinner } from "@nextui-org/react";
import BigForm from "../../components/formFields/BigForm";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import DisplayError from "~/components/ui/DisplayError";

export default function UpdateProfile() {
  const { data: userSession } = useSession({ required: true });
  const { data: user, status } = api.user.getOne.useQuery(
    { id: userSession?.user?.id ?? "" },
    { enabled: !!userSession?.user },
  );

  if (status === "loading")
    return (
      <Spinner className="mt-10 flex h-screen items-center align-middle" />
    );
  if (status === "error") return <DisplayError />;

  return (
    <section className="mx-auto flex flex-col items-center justify-center p-4">
      <Card fullWidth className="p-4 md:p-10">
        {user?.userType === "Friend" && userSession?.user?.id ? (
          <BigForm {...user} userId={userSession.user.id} />
        ) : (
          <p>You are down for fun ?</p>
        )}
      </Card>
    </section>
  );
}
