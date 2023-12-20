import { api } from "~/utils/api";
import { TfiClose } from "react-icons/tfi";

import { toast } from "react-toastify";
import { handleRouterNavigation } from "~/helpers/searchParams";
import ContactItem from "./ContactItem";

type PropType = {
  onClose: () => void;
  onlines: Record<string, string>;
};
export default function Contacts({ onClose, onlines }: PropType) {
  const { data: contactsData, refetch: refetchContacts } =
    api.contact.getContacts.useQuery();

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

  type FuncType = {
    contactId: string;
    userId: string;
  };
  const handleModalAction = ({
    contactId,
    userId,
    type,
  }: FuncType & { type: "block" | "delete" }) => {
    const func = type === "block" ? handleBlockButton : handleDeleteButton;
    func({ contactId, userId });
    void refetchContacts();
  };
  const handleDeleteButton = ({ contactId }: FuncType) => {
    deleteContact.mutate({ id: contactId });
  };

  const handleBlockButton = ({ contactId, userId }: FuncType) => {
    blockContact.mutate({ contactId, userId });
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
        {contactsData?.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            handleContactButtonClick={handleContactButtonClick}
            handleModalAction={handleModalAction}
            online={onlines[contact.contactId] ?? "Offline"}
          />
        ))}
      </div>
    </>
  );
}
