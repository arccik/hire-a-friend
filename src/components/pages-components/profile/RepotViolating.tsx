import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { api } from "~/utils/api";

export default function ReportViolating() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: userSession } = useSession();
  const router = useRouter();
  const reportUser = api.email.reportUser.useMutation({
    onSuccess: () => toast.success("Report has been sent!"),
    onError: () =>
      toast.error(
        "Something went wrong! Please contact admin though Contac Us form",
      ),
  });

  const handleReportUser = () => {
    if (!userSession?.user.id) return;
    reportUser.mutate({
      email: userSession.user.email!,
      id: router.query.id as string,
    });
  };
  return (
    <div className="mt-10 border-t border-gray-200 py-10 text-center">
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
                    Report
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
                    <Button
                      color="primary"
                      onPress={onClose}
                      onClick={handleReportUser}
                    >
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
