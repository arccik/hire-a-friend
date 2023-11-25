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

type FuncType = {
  contactId: string;
  userId: string;
  type: "block" | "delete";
};

type PropType = {
  contact: ContactItem;
  handleContactButtonClick: (contactId: string) => void;
  handleModalAction: ({ contactId, userId }: FuncType) => void;
};

export default function ContactItem({
  contact,
  handleContactButtonClick,
  handleModalAction,
}: PropType) {
  const [showBlockModal, setShowBlockModal] = useState<string | null>(null);

  return (
    <div
      key={contact.contactId}
      className="flex w-full animate-appearance-in cursor-pointer content-start items-center justify-between p-2 text-black hover:bg-slate-200"
    >
      <User
        onClick={() => handleContactButtonClick(contact.contactId)}
        key={contact.contactId}
        isFocusable
        name={contact.name}
        description={<p className="text-red-500">Online</p>}
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
                <p>Are you sure you want to {showBlockModal} this user?</p>
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
                  onClick={() =>
                    handleModalAction({
                      contactId: contact.id,
                      userId: contact.contactId,
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
