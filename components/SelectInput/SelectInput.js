import { useState } from 'react';

export default function SelectInput({ name, options, required, value }) {
  const [inputValue, setInputValue] = useState(value);
  return (
    <div className="flex flex-col w-1/2 ml-4 mr-4">
      <label>{name[0].toUpperCase() + name.slice(1)} </label>
      <select
        id={name}
        name={name}
        className="bg-gray-200 rounded h-10 outline-none"
        required={required}
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}>
        <option value=""></option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option[0].toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
