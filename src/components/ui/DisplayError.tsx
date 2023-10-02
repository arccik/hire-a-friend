import { Chip } from "@nextui-org/react";

export default function DisplayError() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Chip color="danger" className="p-5">
        Ops... Something went wrong
      </Chip>
    </div>
  );
}
