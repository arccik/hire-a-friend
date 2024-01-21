import { Spinner } from "@nextui-org/react";
import { cn } from "~/lib/utils";

export default function Loader({
  size = "md",
  fullWidth = true,
}: {
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}) {
  return (
    <Spinner
      size={size}
      className={cn("flex h-full items-center justify-center", {
        "w-full": fullWidth,
      })}
      color="warning"
    />
  );
}
