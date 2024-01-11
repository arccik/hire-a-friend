import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Spinner,
} from "@nextui-org/react";
import { type UserType } from "@prisma/client";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { api } from "~/utils/api";
import { FaHandHoldingHeart, FaHandHoldingUsd } from "react-icons/fa";

type PropType = {
  title: string;
  description: string;
  subtitle: string;
  image?: string;
  memberType: UserType;
};

export default function MembershipCard({
  title,
  description,
  subtitle,
  image,
  memberType,
}: PropType) {
  useSession({ required: true });
  const { data: isTypeSelected, status } =
    api.user.isUserTypeChoosen.useQuery();
  const changeStatus = api.user.changeMemberStatus.useMutation({
    onSuccess: () => {
      void Router.replace(`/auth/update-profile`);
    },
  });
  if (status === "loading") return <Spinner />;

  if (isTypeSelected) void Router.replace(`/auth/update-profile`);

  const handleClick = () => {
    changeStatus.mutate({
      memberType,
    });
  };
  return (
    <Card className="border border-orange-500 py-4">
      <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
        <h4 className="text-2xl font-bold">{title}</h4>
        <small className="mb-1 text-default-500">{description}</small>
        <p className="text-tiny font-bold uppercase text-orange-500">
          {subtitle}
        </p>
      </CardHeader>
      <CardBody className="items-center overflow-visible py-2">
        {image ? (
          <Image alt="Card background" src={image} width={270} height="auto" />
        ) : (
          <br />
        )}
        {memberType === "Customer" ? (
          <FaHandHoldingHeart size="5rem" />
        ) : (
          <FaHandHoldingUsd size="5rem" />
        )}
      </CardBody>
      <CardFooter>
        <Button
          onClick={handleClick}
          fullWidth
          className="bg-orange-500 text-white hover:scale-95"
          variant="flat"
        >
          Select
        </Button>
      </CardFooter>
    </Card>
  );
}
