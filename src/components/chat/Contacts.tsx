import { useRouter } from "next/router";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  User,
} from "@nextui-org/react";
import { api } from "~/utils/api";
import { TfiClose } from "react-icons/tfi";
import { BsThreeDotsVertical } from "react-icons/bs";

import { toast } from "react-toastify";
import Link from "next/link";
import { useState } from "react";
import ActionButtonsModal from "./ActionButtonModal";

type PropType = {
  onClose: () => void;
};
export default function Contacts({ onClose }: PropType) {
  const [showBlockModal, setShowBlockModal] = useState<string | null>(null);
  const router = useRouter();
  const { data: contactsData, refetch: refetchContacts } =
    api.chat.getContacts.useQuery();
  const deleteContact = api.chat.deleteContact.useMutation({
    onError: (e) => toast.error(e.message),
    onSuccess: async () => {
      toast.success(`Contact Deleted!`);
      await refetchContacts();
    },
  });
  const blockContact = api.chat.blockContact.useMutation({
    onError: (e) => toast.error(e.message),
    onSuccess: async () => {
      toast.success(`Contact blocked!`);
      await refetchContacts();
    },
  });

  const handleCloseButton = (index: string) => {
    const { pathname, query } = router;
    router.query.chat = index;
    void router.replace({ pathname, query }, undefined, { shallow: true });
  };

  const handleModalAction = (id: string) => {
    const func =
      showBlockModal === "block" ? handleBlockButton : handleDeleteButton;
    setShowBlockModal(null);
    func(id);
    void refetchContacts();
  };
  const handleDeleteButton = (id: string) => {
    deleteContact.mutate({ id });
  };

  const handleBlockButton = (id: string) => {
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
      <div className="flex flex-col items-start overflow-auto md:mt-5">
        {!contactsData?.length && (
          <p className=" h-full w-full py-10 text-center  text-lg font-semibold text-slate-500 md:p-3">
            No contacts
          </p>
        )}
        {contactsData?.map((contact) => (
          <div
            key={contact.contactId}
            className="flex w-full animate-appearance-in cursor-pointer content-start items-center  justify-between p-2 text-black hover:bg-slate-200"
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

            <Dropdown>
              <DropdownTrigger>
                <Button variant="ghost" size="sm">
                  <BsThreeDotsVertical />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="Profile"
                  as={Link}
                  href={`/profile/${contact.contactId}`}
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="block"
                  color="danger"
                  onClick={() => setShowBlockModal("block")}
                >
                  Block User
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onClick={() => setShowBlockModal("delete")}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Modal
              isOpen={!!showBlockModal}
              placement="auto"
              onOpenChange={() => setShowBlockModal(null)}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 uppercase">
                      {showBlockModal} User
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        Are you sure you want to {showBlockModal} this user?
                      </p>
                      <p className="text-sm text-red-500">
                        This action cannot be undone.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        No
                      </Button>
                      <Button
                        color="primary"
                        onPress={onClose}
                        onClick={() => handleModalAction(contact.id)}
                      >
                        Yes
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        ))}
      </div>
      {/* <ActionButtonsModal isOpen={showBlockModal} title="Delete" /> */}
      {/* For Action Buttons */}
    </>
  );
}

