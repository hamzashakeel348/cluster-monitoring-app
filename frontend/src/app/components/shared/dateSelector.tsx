import React from "react";

interface DateSelectorProps {
  selectedDays: number;
  setSelectedDays: (days: number) => void;
}

const DateSelector = ({ selectedDays, setSelectedDays }: DateSelectorProps) => {
  const days = [2, 4, 6];
  return (
    <div>
      <select
        className="bg-gray-800 border-2 border-gray-700 text-gray-400 lg:text-lg text-sm rounded-lg p-2 h-10 lg:w-auto w-full"
        onChange={(e) => setSelectedDays(Number(e.target.value))}
        value={selectedDays}
      >
        {days.map((day, index) => {
          return (
            <option value={day} key={index}>
              Last {day} days
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DateSelector;
