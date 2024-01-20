import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  Badge,
} from "@nextui-org/react";
import { CiBellOn } from "react-icons/ci";
import { api } from "~/utils/api";
import Loader from "../../features/Loader";

import DisplayError from "../../features/DisplayError";
import Notification from "./Notification";
import { toast } from "react-toastify";

export default function NotificationCenter() {
  const {
    data: notifications,
    status,
    refetch: refetchNotification,
  } = api.notify.getAll.useQuery();
  const setAllRead = api.notify.setAllRead.useMutation({
    onSuccess: async () => {
      await refetchNotification();
    },
    onError: (e) => {
      toast.error("Something went Wrong");
      console.log("setAllRead", e.message);
    },
  });

  if (status === "loading") return <Loader size="sm" />;
  if (status === "error") return <DisplayError />;

  if (!notifications.length) {
    return (
      <DropdownItem>
        <p className="flex h-full w-full flex-row items-center justify-center text-slate-400">
          No Notification yet.
        </p>
      </DropdownItem>
    );
  }

  const menuStyles = {
    base: [
      "rounded-md",
      "text-default-500",
      "transition-opacity",
      "data-[hover=true]:text-foreground",
      "data-[hover=true]:bg-default-100",
      "dark:data-[hover=true]:bg-default-50",
      "data-[selectable=true]:focus:bg-default-50",
      "data-[pressed=true]:opacity-70",
      "data-[focus-visible=true]:ring-default-500",
    ],
  };

  const count = notifications.reduce(
    (acc, cur) => (acc += cur.isRead ? 0 : 1),
    0,
  );

  const handleBellClick = () => {
    setAllRead.mutate();
  };

  return (
    <Dropdown showArrow radius="sm">
      <Badge content={count} color="warning" isInvisible={!count}>
        <DropdownTrigger>
          <Button
            isIconOnly
            className="relative border-none"
            variant="ghost"
            disableRipple
            onClick={handleBellClick}
          >
            <CiBellOn size="2rem" />
          </Button>
        </DropdownTrigger>
      </Badge>
      <DropdownMenu
        aria-label="Notification Center"
        className="max-h-96 overflow-auto"
        itemClasses={menuStyles}
      >
        <DropdownSection aria-label="Profile & Actions">
          {notifications.map((notification) => (
            <DropdownItem
              key={notification.id}
              isReadOnly
              textValue={notification.message}
            >
              <Notification notification={notification} />
            </DropdownItem>
          ))}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
