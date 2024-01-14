import { Button, Spinner } from "@nextui-org/react";
import { ReadyState } from "react-use-websocket";

type Props = {
  readyState: ReadyState;
};
export default function SocketStatus({ readyState }: Props) {
  const handlePageReload = () => {
    window.location.reload();
  };
  switch (readyState) {
    case ReadyState.OPEN:
      return null;
    case ReadyState.CONNECTING:
      return (
        <Spinner className="grid h-screen place-items-center" color="success" />
      );

    case ReadyState.CLOSING:
      return (
        <>
          <Button onClick={handlePageReload} variant="light" color="primary">
            Reload
          </Button>
          <Spinner
            className="grid h-screen place-items-center"
            color="warning"
          />
        </>
      );
    case ReadyState.CLOSED:
      return (
        <div className="flex flex-col justify-center gap-10">
          <Spinner className="grid  place-items-center" color="warning" />
          <Button
            onClick={handlePageReload}
            className="mx-auto"
            variant="light"
            color="primary"
          >
            Reload
          </Button>
        </div>
      );
    case ReadyState.UNINSTANTIATED:
      return <Button> Retry</Button>;
    default:
      return null;
  }
}
