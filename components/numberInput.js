import React from "react";

const NumberInput = ({ label, id, value, onChange, min, max }) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-2 text-sm text-gray-600 font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="number"
        className="border-2 border-black rounded p-2 w-full"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
      />
    </div>
  );
};

export default NumberInput;
