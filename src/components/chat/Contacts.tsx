import { api } from "~/utils/api";
import { TfiClose } from "react-icons/tfi";

import { toast } from "react-toastify";
import { handleRouterNavigation } from "~/helpers/searchParams";
import ContactItem from "./ContactItem";

type ContactsProp = {
  onClose: () => void;
};

type ModalActionParams = {
  id: string;
  type?: "block" | "delete";
};

export default function Contacts({ onClose }: ContactsProp) {
  // const { data: contactsData, refetch: refetchContacts } =
  //   api.contact.getContacts.useQuery();
  const { data: contactsData, refetch: refetchContacts } =
    api.chat.getContacts.useQuery();
  const deleteContact = api.contact.deleteContact.useMutation({
    onError: (e) => toast.error(e.message),
    onSuccess: async () => {
      toast.success(`Contact Deleted!`);
      await refetchContacts();
    },
  });

  const blockContact = api.contact.blockContact.useMutation({
    onError: (e) => toast.error(e.message),
    onSuccess: async () => {
      toast.success(`Contact blocked!`);
      await refetchContacts();
    },
  });

  const handleContactButtonClick = (contactId: string) => {
    handleRouterNavigation({ chat: contactId });
  };

  const handleModalAction = ({ id, type }: ModalActionParams) => {
    const func = type === "block" ? handleBlockButton : handleDeleteButton;
    func({ id });
    void refetchContacts();
  };
  const handleDeleteButton = ({ id }: ModalActionParams) => {
    deleteContact.mutate({ id });
  };

  const handleBlockButton = ({ id }: ModalActionParams) => {
    blockContact.mutate({ id });
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
      <div className="flex flex-col items-start overflow-auto overflow-x-hidden   md:mt-5">
        {!contactsData?.length && (
          <>
            <p className=" h-full w-full py-10 text-center  text-lg font-semibold text-slate-500 md:p-3">
              No contacts
            </p>
            <p className="h-full w-full p-3 py-10  text-center text-xs font-semibold text-slate-500">
              To start chatting, simply explore profiles and find someone who
              piques your interest. Once you&apos;ve found a match, press
              &apos;Send Message&apos; on their profile to break the ice and
              begin a delightful conversation.
            </p>
          </>
        )}
        {contactsData?.map((contact) => {
          if (!contact) return;
          return (
            <ContactItem
              key={contact.id}
              contact={contact}
              handleContactButtonClick={handleContactButtonClick}
              handleModalAction={handleModalAction}
              online="Could be online - check"
            />
          );
        })}
      </div>
    </>
  );
}
