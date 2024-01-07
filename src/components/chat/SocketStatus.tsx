import { Button, Spinner } from "@nextui-org/react";
import { ReadyState } from "react-use-websocket";

type Props = {
  readyState: ReadyState;
};
export default function SocketStatus({ readyState }: Props) {
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
          <Spinner
            className="grid h-screen place-items-center"
            color="warning"
          />
          <Button onClick={() => window.location.reload}>Refresh Page</Button>
        </>
      );
    case ReadyState.CLOSED:
      return (
        <>
          <Spinner
            className="grid h-screen place-items-center"
            color="warning"
          />
          <Button>Refresh Page</Button>
        </>
      );
    case ReadyState.UNINSTANTIATED:
      return <Button> Retry</Button>;
    default:
      return null;
  }
  return null;
}
