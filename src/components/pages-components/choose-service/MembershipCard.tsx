import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { type UserType } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

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
  const { data: sessionData } = useSession({ required: true });
  const router = useRouter();
  const changeStatus = api.user.changeMemberStatus.useMutation({
    onSuccess: () => {
      void router.replace(`/auth/update-profile`);
    },
  });

  const handleClick = () => {
    changeStatus.mutate({
      memberType,
    });
  };
  return (
    <Card className="py-4">
      <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
        <h4 className="text-large font-bold">{title}</h4>
        <small className="mb-1 text-default-500">{description}</small>
        <p className="text-tiny font-bold uppercase">{subtitle}</p>
      </CardHeader>
      <CardBody className="items-center overflow-visible py-2">
        {image ? (
          <Image alt="Card background" src={image} width={270} />
        ) : (
          <br />
        )}
      </CardBody>
      <CardFooter>
        <Button
          onClick={handleClick}
          fullWidth
          color="primary"
          variant="bordered"
        >
          Select
        </Button>
      </CardFooter>
    </Card>
  );
}
