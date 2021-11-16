import { useState } from 'react';

export default function Input({ type, name, required, style, value }) {
  const defaultStyle = `bg-gray-200 rounded h-10 outline-none pl-2 ${style}`;
  const label = name === 'url' ? 'Photo url' : name;
  const [inputValue, setInputValue] = useState(value);

  return (
    <div className="flex flex-col w-1/2 mt-6">
      <label>{label[0].toUpperCase() + label.slice(1)} </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        className={defaultStyle}
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      />
    </div>
  );
}
