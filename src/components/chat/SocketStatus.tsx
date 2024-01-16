import { Button } from "@nextui-org/react";
import { ReadyState } from "react-use-websocket";
import Loader from "../features/Loader";

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
      return <Loader />;

    case ReadyState.CLOSING:
      return (
        <>
          <Button onClick={handlePageReload} variant="light" color="primary">
            Reload
          </Button>
          <Loader />
        </>
      );
    case ReadyState.CLOSED:
      return (
        <div className="flex flex-col justify-center gap-10">
          <Loader />
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
