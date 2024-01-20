import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { type Appearance } from "@prisma/client";

type PropType = {
  data: Appearance | null | undefined;
};

function formatString(inputString: string) {
  // Split the input string into words
  const words = inputString.split(/(?=[A-Z])/);

  // Capitalize the first letter of each word and join them with a space
  const formattedString = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedString;
}

export default function ApearanceTable({ data }: PropType) {
  const toDisplay = Object.entries(data ?? [])
    .filter((value) => value[1] !== "" && value[0] !== "id")
    .map(([key, value]) => {
      return (
        <TableRow key={key}>
          <TableCell>{formatString(key)}</TableCell>
          <TableCell>
            <b>{value}</b>
          </TableCell>
        </TableRow>
      );
    });
  if (!toDisplay.length) return null;

  return (
    <>
      <p className="m-10 text-center text-2xl font-thin text-orange-500">
        Apearance
      </p>
      <div className="mb-5 flex justify-center border-gray-200">
        <Table hideHeader aria-label="Apearance Table" className="md:w-1/2">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>PARAMS</TableColumn>
          </TableHeader>
          <TableBody>{toDisplay}</TableBody>
        </Table>
      </div>
    </>
  );
}
