import { Card, CardBody } from "@nextui-org/react";
import React from "react";

export default function Alert({ show }: { show: boolean }) {
  if (!show) return;
  return (
    <Card className="border border-red-500">
      <CardBody>
        <p className="text-red-500">
          The account is currently not visible. Kindly ensure all required
          fields are filled before activating the switch.
        </p>
      </CardBody>
    </Card>
  );
}
