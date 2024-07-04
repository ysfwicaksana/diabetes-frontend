// SelectInput.js

import React from "react";

const SelectInput = ({ label, id, value, onChange, options }) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-2 text-sm text-gray-600 font-semibold" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="border-2 border-black rounded p-2 w-full"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
