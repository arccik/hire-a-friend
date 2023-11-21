import { Button } from "@nextui-org/react";
import Divider from "~/components/features/Divider";
import { clearSearchParams } from "~/helpers/searchParams";

type PropType = {
  show: boolean;
};

export default function ClearFilter({ show }: PropType) {
  if (!show) return null;
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <p className="text-xl font-bold">Nothing found</p>
      <p className="text-center text-gray-600">Try to change your filter</p>
      <Divider text="or" />
      <Button size="sm" onClick={clearSearchParams}>
        Clear filter
      </Button>
    </div>
  );
}
