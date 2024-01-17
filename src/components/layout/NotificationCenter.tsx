import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  Avatar,
} from "@nextui-org/react";
import { CiBellOn } from "react-icons/ci";
import { api } from "~/utils/api";
import Loader from "../features/Loader";
import DisplayError from "../features/DisplayError";
import { useRouter } from "next/router";
import { formatNoticationfDateTime } from "~/helpers/formatMessageDateTime";
import { useMemo } from "react";
import { Notification } from "@prisma/client";
import { handleRouterNavigation } from "~/helpers/searchParams";

export default function NotificationCenter() {
  const { data: notifications, status } = api.notify.getAll.useQuery();
  const setAllRead = api.notify.setAllRead.useMutation();
  const router = useRouter();

  if (status === "loading") return <Loader />;
  if (status === "error") return <DisplayError />;

  const countUnreadMessages = notifications.reduce(
    (acc, cur) => (acc += cur.isRead ? 0 : 1),
    0,
  );

  const handleNotificationClick = (notificaiton: Notification) => {
    if (notificaiton.message.includes("Message")) {
      handleRouterNavigation({ chat: notificaiton.id, showChat: true });
    } else {
      void router.push(`/profile/${notificaiton.id}`);
    }
  };
  return (
    <Dropdown showArrow radius="sm">
      <DropdownTrigger>
        <Button
          isIconOnly
          className="border-none"
          variant="ghost"
          // color="warning"
          disableRipple
          onClick={() => setAllRead.mutate()}
        >
          <CiBellOn size="2rem" />
          {!!countUnreadMessages && (
            <p className="p-1"> {countUnreadMessages}</p>
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        disabledKeys={["profile"]}
        className="h-96 overflow-auto"
        itemClasses={{
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
        }}
      >
        <DropdownSection aria-label="Profile & Actions">
          {!!notifications.length ? (
            notifications.map((notificaiton) => (
              <DropdownItem
                isReadOnly
                key={notificaiton.id}
                textValue={notificaiton.message}
              >
                <div
                  onClick={() => handleNotificationClick(notificaiton)}
                  className="flex flex-row items-center gap-2"
                >
                  <Avatar
                    name="Junior Garcia"
                    size="sm"
                    src={notificaiton.image}
                    className="h-6 w-6 text-tiny"
                    classNames={{
                      name: "text-default-600",
                    }}
                  />
                  <p className="w-full truncate text-xs md:w-48">
                    {notificaiton.message}
                  </p>
                  <span className="text-xs text-slate-400">
                    {formatNoticationfDateTime(notificaiton.createdAt)}
                  </span>
                </div>
              </DropdownItem>
            ))
          ) : (
            <DropdownItem>
              <p className="flex h-full w-full flex-row items-center justify-center text-slate-400">
                No Notification yet.
              </p>
            </DropdownItem>
          )}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
