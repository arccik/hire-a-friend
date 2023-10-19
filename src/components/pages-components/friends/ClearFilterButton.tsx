import { Button } from "@nextui-org/react";
import { NextRouter } from "next/router";
import Divider from "~/components/features/Divider";

export default function ClearFilter({
  router,
  show,
}: {
  router: NextRouter;
  show: boolean;
}) {
  if (!show) return null;
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <p className="text-xl font-bold">Nothing found</p>
      <p className="text-center text-gray-600">Try to change your filter</p>
      <Divider text="or" />
      <Button
        size="sm"
        color="secondary"
        onClick={() => {
          void router.push(
            { pathname: router.pathname, query: null },
            undefined,
            {
              shallow: true,
            },
          );
        }}
      >
        Clear all filters
      </Button>
    </div>
  );
}
