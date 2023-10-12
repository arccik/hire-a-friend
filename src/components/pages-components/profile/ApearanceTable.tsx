import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Appearance } from "@prisma/client";

type PropType = {
  data: Appearance | null | undefined;
};

export default function ApearanceTable({ data }: PropType) {
  if (!data) return null;
  const toDisplay = Object.entries(data)
    .filter((value) => value[1] !== "" && value[0] !== "id")
    .map(([key, value]) => {
      return (
        <TableRow key={key}>
          <TableCell>{key}</TableCell>
          <TableCell>
            <b>{value}</b>
          </TableCell>
        </TableRow>
      );
    });
  return (
    <>
      <p className="mb-2 text-center text-2xl font-thin">Apearance</p>
      <div className="mb-5 flex justify-center border-gray-200">
        {/* Table */}
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
