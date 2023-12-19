import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Badge,
} from "@nextui-org/react";
import { IoMdNotificationsOutline } from "react-icons/io";

import { api } from "~/utils/api";

export default function NotificationCenter() {
  const { data, refetch } = api.notify.getUnread.useQuery();

  // console.log("get Unread notify", data);
  return (
    <Popover showArrow placement="bottom">
      <Badge color="danger" content={data} isInvisible={!data} shape="circle">
        <PopoverTrigger>
          <Button
            isIconOnly
            variant="ghost"
            className="border-none"
            radius="lg"
          >
            <IoMdNotificationsOutline className="text-2xl transition-transform" />
          </Button>
        </PopoverTrigger>
      </Badge>
      <PopoverContent className="p-1">
        <NotificationItems refetch={() => void refetch()} />
      </PopoverContent>
    </Popover>
  );
}

const NotificationItems = ({ refetch }: { refetch: () => void }) => {
  const { data: notifications } = api.notify.getAll.useQuery();

  const setRead = api.notify.setRead.useMutation({
    onSuccess: () => refetch(),
    onError: () => console.error("Notification did't update"),
  });

  const handleNotificationClick = (id: string) => {
    console.log("NOTOFICATION CLICKED", id);
    setRead.mutate(id);
  };
  return (
    <Card shadow="none" className="max-w-[400px] border-none bg-transparent">
      <CardHeader>Notifications</CardHeader>
      <CardBody className="px-0 py-0 ">
        {notifications?.map((value) => (
          <div
            key={value.id}
            onClick={() => handleNotificationClick(value.id)}
            className="flex cursor-pointer items-center rounded-lg p-3 hover:bg-slate-50"
          >
            <Avatar
              className="mr-2"
              size="sm"
              src={value.image}
              alt="Notification image"
            />

            <p className="pl-px text-small">
              {value.message}
              <span aria-label="confetti" role="img">
                🎉
              </span>
            </p>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};
