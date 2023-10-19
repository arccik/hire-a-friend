import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <Button
      size="sm"
      variant="light"
      onClick={() => router.back()}
      className="absolute left-2 top-10 z-10 hidden text-xl font-bold lg:left-10 lg:block"
    >
      <RiArrowGoBackFill />
      Go Back
    </Button>
  );
}
