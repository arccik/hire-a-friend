import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";

type PropType = {
  isOpen: boolean;
  title?: string | null;
};

export default function ActionButtonsModal({ isOpen, title }: PropType) {
  const [showModal, setShowModal] = useState(true);
  return (
    <Modal isOpen={showModal} placement="auto" onOpenChange={setShowModal}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 uppercase">
              {title} User
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to {title} this user?</p>
              <p className="text-sm text-red-500">
                This action cannot be undone.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                No
              </Button>
              <Button
                className="border-orange-500 text-orange-500"
                variant="bordered"
                onPress={onClose}
              >
                Yes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
