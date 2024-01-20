import { Spinner } from "@nextui-org/react";

export default function Loader({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <Spinner
      size={size}
      className="flex h-full w-full items-center justify-center"
      color="warning"
    />
  );
}
