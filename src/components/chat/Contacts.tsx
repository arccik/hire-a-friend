import { useRouter } from "next/router";
import { User } from "@nextui-org/react";
import { cn } from "~/lib/utils";
import { api } from "~/utils/api";
import { TfiClose } from "react-icons/tfi";

type PropType = {
  onClose: () => void;
};
export default function Contacts({ onClose }: PropType) {
  const router = useRouter();
  const { data: contactsData } = api.chat.getContacts.useQuery();

  const handleCloseButton = (index: string) => {
    const { pathname, query } = router;
    router.query.chat = index;
    void router.replace({ pathname, query }, undefined, { shallow: true });
  };

  return (
    <>
      <div className="flex items-center justify-between overflow-auto border-b p-3">
        <p className="h-12 p-3 text-lg  font-semibold text-slate-500">
          Contacts
        </p>
        <TfiClose
          className="inline-flex cursor-pointer rounded-full p-2 text-black hover:bg-indigo-50"
          size="2rem"
          onClick={onClose}
        />
      </div>
      <div className="flex flex-col items-start overflow-auto md:mt-5">
        {!contactsData?.length && (
          <p className="h-12 p-2 text-center text-lg font-semibold  text-slate-500 md:p-3">
            No contacts
          </p>
        )}
        {contactsData?.map((contact) => (
          <User
            onClick={() => handleCloseButton(contact.contactId)}
            key={contact.id}
            isFocusable
            name={contact.name}
            className={cn(
              "w-full animate-appearance-in cursor-pointer content-start justify-start p-2 text-black hover:bg-slate-200",
              // selected === contact.id && "bg-slate-300",
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

