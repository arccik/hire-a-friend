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

export default function NotificationCenter() {
  const { data: notifications, status } = api.notify.getAll.useQuery();
  const router = useRouter();
  if (status === "loading") return <Loader />;
  if (status === "error") return <DisplayError />;

  console.log("notification", notifications);
  return (
    <Dropdown showArrow radius="sm">
      <DropdownTrigger>
        <Button
          isIconOnly
          className="border-none"
          variant="ghost"
          color="warning"
          disableRipple
        >
          <CiBellOn size="2rem" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        disabledKeys={["profile"]}
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
              <DropdownItem isReadOnly key={notificaiton.id}>
                <div
                  onClick={() => router.push(`/profile/${notificaiton.id}`)}
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
