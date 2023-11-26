import React, { type ChangeEvent } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import data from "~/data/activities.json";
export default function ServicesOffer() {
  const [values, setValues] = React.useState(new Set(""));

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValues(new Set(e.target.value));
  };
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        label="Activities"
        translate="no"
        variant="bordered"
        selectionMode="multiple"
        placeholder="Select services you offer"
        selectedKeys={values}
        className="max-w-xs"
        onChange={handleSelectionChange}
      >
        {data.map((item, index) => (
          <SelectItem key={item.value + index} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
