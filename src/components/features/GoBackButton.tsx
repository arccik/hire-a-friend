import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <Button
      size="sm"
      variant="light"
      onClick={() => router.back()}
      className="absolute left-2 top-10 z-10 hidden opacity-75 lg:left-10 lg:flex"
    >
      <IoIosArrowRoundBack />
      Back
    </Button>
  );
}

