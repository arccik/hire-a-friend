import { useRouter } from "next/router";
import { User } from "@nextui-org/react";
import { cn } from "~/lib/utils";
import { api } from "~/utils/api";

type PropType = {
  selected: string | null;
};
export default function Contacts({ selected }: PropType) {
  const router = useRouter();
  const { data: contactsData } = api.chat.getContacts.useQuery();

  const handleCloseButton = (index: string) => {
    const { pathname, query } = router;
    router.query.chat = index;
    void router.replace({ pathname, query }, undefined, { shallow: true });
  };

  return (
    <>
      <div className="hidden justify-between overflow-auto border-b md:flex md:items-center md:p-2">
        <p className="-rotate-90 text-xs font-semibold text-slate-500 md:h-12 md:rotate-0 md:p-3 md:text-lg">
          Contacts
        </p>
      </div>
      <div className="flex items-start overflow-auto md:mt-5 md:flex-col">
        {contactsData?.map((contact) => (
          <User
            onClick={() => handleCloseButton(contact.contactId)}
            key={contact.id}
            isFocusable
            name={contact.name}
            className={cn(
              "w-full animate-appearance-in cursor-pointer content-start justify-start p-2 text-black hover:bg-slate-200",
              selected === contact.id && "bg-slate-300",
            )}
            avatarProps={{
              src: contact.image ?? "",
            }}
          />
        ))}
      </div>
    </>
  );
}

