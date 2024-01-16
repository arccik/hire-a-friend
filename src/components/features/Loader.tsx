import { Spinner } from "@nextui-org/react";

export default function Loader() {
  return (
    <Spinner
      className="flex h-full w-full items-center justify-center"
      color="warning"
    />
  );
}
