import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function ApearanceTable() {
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
          <TableBody>
            <TableRow key="1">
              <TableCell>Height</TableCell>
              <TableCell>6</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>Weight</TableCell>
              <TableCell>60 kg</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Hair Color</TableCell>
              <TableCell>Blond</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>Eye Color</TableCell>
              <TableCell>Blue</TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell>Body Type</TableCell>
              <TableCell>Athletic</TableCell>
            </TableRow>
            <TableRow key="6">
              <TableCell>Ethnicity</TableCell>
              <TableCell>White</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
