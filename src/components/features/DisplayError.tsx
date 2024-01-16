import { Chip } from "@nextui-org/react";

type DisplayErrorProps = {
  content?: string;
};
export default function DisplayError({ content }: DisplayErrorProps) {
  const text = content || "Ops... Something went wrong";
  return (
    <div className="flex h-screen items-center justify-center">
      <Chip color="danger" className="p-5">
        {text}
      </Chip>
    </div>
  );
}
