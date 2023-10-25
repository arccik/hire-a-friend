import { useRouter } from "next/router";
import { User } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

type ContactsType =
  | {
      sender: string;
      receiver: string;
    }[]
  | null;

type PropType = {
  selected: string | null;
};
export default function Contacts({ selected }: PropType) {
  const router = useRouter();
  const [contacts, setContacts] = useState<ContactsType>(null);

  useEffect(() => {
    const fetchContacts = () => {
      const url = `/api/chat/contacts`;

      fetch(url)
        .then(async (r) => {
          const data = await r.json();
          console.log("list of contacts: ", data);
          setContacts(data);
        })
        .catch(() => console.log("Couldn't get contacts from db"));
    };
    fetchContacts();
  }, []);

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
        {contacts?.map((contact) => (
          <User
            onClick={() => handleCloseButton(contact.receiver)}
            key={contact.receiver}
            isFocusable
            name={contact.receiver}
            className={cn(
              "animate-appearance-in cursor-pointer p-2 text-black hover:bg-slate-200",
              selected === contact.receiver && "bg-slate-300",
            )}
            description="Product Designer"
            avatarProps={{
              src: "/assets/images/logo-circle.png",
            }}
          />
        ))}
      </div>
    </>
  );
}

