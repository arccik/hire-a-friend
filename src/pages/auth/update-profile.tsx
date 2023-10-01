// import { Card } from "@nextui-org/react";
// import BigForm from "../../components/formFields/BigForm";
// import { useSession } from "next-auth/react";
// import { api } from "~/utils/api";

// export default function UpdateProfile() {
//   const { data: userSession } = useSession({ required: true });
//   const { data: user, status } = api.user.getOne.useQuery(
//     { id: userSession?.user?.id ?? "" },
//     { enabled: !!userSession?.user },
//   );

//   if (status === "loading") return <p>Loading...</p>;
//   if (status === "error") return <p>Error...</p>;
//   if (!userSession) return <p>Go to login page</p>;

//   return (
//     <section className="mx-auto flex flex-col items-center justify-center p-4">
//       <Card fullWidth className="p-4 md:p-10">
//         {user?.userType === "Friend" ? (
//           <BigForm {...user} userId={userSession?.user.id} />
//         ) : (
//           <p>You are down for fun ?</p>
//         )}
//       </Card>
//     </section>
//   );
// }

export default function UpdateProfile() {
  return <div>UpdateProfile</div>;
}
