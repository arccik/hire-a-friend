import { useRouter } from "next/router";
import { User } from "@nextui-org/react";
import { api } from "~/utils/api";
import { TfiClose } from "react-icons/tfi";
import { VscClose } from "react-icons/vsc";
import { toast } from "react-toastify";

type PropType = {
  onClose: () => void;
};
export default function Contacts({ onClose }: PropType) {
  const router = useRouter();
  const { data: contactsData, refetch: refetchContacts } =
    api.chat.getContacts.useQuery();
  const deleteContact = api.chat.deleteContact.useMutation({
    onError: (e) => toast.error(e.message),
    onSuccess: async () => {
      toast.success("Contact deleted");
      await refetchContacts();
    },
  });

  const handleCloseButton = (index: string) => {
    const { pathname, query } = router;
    router.query.chat = index;
    void router.replace({ pathname, query }, undefined, { shallow: true });
  };

  const handleDeleteButton = (id: string) => {
    deleteContact.mutate({ id });
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
          <div
            key={contact.contactId}
            className="group flex w-full animate-appearance-in cursor-pointer content-start items-center justify-start justify-between p-2 text-black hover:bg-slate-200"
          >
            <User
              onClick={() => handleCloseButton(contact.contactId)}
              key={contact.contactId}
              isFocusable
              name={contact.name}
              avatarProps={{
                src: contact.image ?? "",
              }}
            />
            <VscClose
              className="hidden group-hover:block"
              onClick={() => handleDeleteButton(contact.contactId)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

