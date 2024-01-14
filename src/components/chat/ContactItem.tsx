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
import Link from "next/link";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { type ContactItem } from "~/types/ContactItem";

type ModalActionType = {
  id: string;
  type: "block" | "delete";
};

type PropType = {
  contact: ContactItem;
  handleContactButtonClick: (contactId: string) => void;
  handleModalAction: ({ id }: ModalActionType) => void;
  online?: string;
};

export default function ContactItem({
  contact,
  handleContactButtonClick,
  handleModalAction,
  online,
}: PropType) {
  const [showBlockModal, setShowBlockModal] = useState<string | null>(null);

  return (
    <div
      key={contact.id}
      className="flex w-full animate-appearance-in cursor-pointer content-start items-center justify-between p-2 text-black hover:bg-slate-200"
    >
      <User
        onClick={() => handleContactButtonClick(contact.id)}
        isFocusable
        name={contact.name}
        description={online}
        avatarProps={{
          src: contact.image ?? "",
        }}
      />

      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="shadow"
            isIconOnly
            className="rounded-full bg-transparent"
            size="sm"
          >
            <BsThreeDotsVertical />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Contact Actions">
          <DropdownItem key="Profile" as={Link} href={`/profile/${contact.id}`}>
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
                <p>Are you sure you want to {showBlockModal} this user?</p>
                <p className="text-bold text-sm text-red-500">
                  This action cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="warning" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button
                  onPress={onClose}
                  variant="bordered"
                  className=" hover:border-red-500 hover:text-red-500"
                  onClick={() =>
                    handleModalAction({
                      id: contact.id,
                      type: showBlockModal as "block" | "delete",
                    })
                  }
                >
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
