// components/TimePicker.tsx
import React from "react";

interface TimePickerProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <label htmlFor="time">{label}</label>
      <input id="time" type="time" value={value} onChange={onChange} />
    </div>
  );
};

export default TimePicker;
