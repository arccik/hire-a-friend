import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function ReportViolating() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className=" border-t border-gray-200 py-10 text-center">
      <div className="flex flex-wrap justify-center">
        <div className="w-full px-4 lg:w-9/12">
          <p className="text-tiny leading-relaxed text-gray-700">
            Your Safety Matters. If you believe this person is harassing you or
            violating our community guidelines, please don not hesitate to
            report. We are here to ensure a safe and respectful environment for
            all.
          </p>
          <Button
            onPress={onOpen}
            size="sm"
            variant="light"
            color="danger"
            className="m-1 font-normal text-pink-500"
          >
            Report
          </Button>

          <Modal isOpen={isOpen} placement="auto" onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Report User
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      Your Safety Matters. If you believe this person is
                      harassing you or violating our community guidelines,
                      please don not hesitate to report. We are here to ensure a
                      safe and respectful environment for all.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      No
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Yes
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
}
