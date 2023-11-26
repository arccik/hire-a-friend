// components/DayPicker.tsx
import React from "react";

interface DayPickerProps {
  day: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DayPicker: React.FC<DayPickerProps> = ({ day, onChange }) => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div>
      <label htmlFor="day">Select Day:</label>
      <select id="day" name="day" value={day} onChange={onChange}>
        <option value="" disabled>
          Select a day
        </option>
        {daysOfWeek.map((day) => (
          <option key={day} value={day.toLowerCase()}>
            {day}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DayPicker;
