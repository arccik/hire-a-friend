// components/AllDayCheckbox.tsx
import React from "react";

interface AllDayCheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AllDayCheckbox: React.FC<AllDayCheckboxProps> = ({
  checked,
  onChange,
}) => {
  return (
    <div>
      <input
        id="allDay"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor="allDay">All Day</label>
    </div>
  );
};

export default AllDayCheckbox;
