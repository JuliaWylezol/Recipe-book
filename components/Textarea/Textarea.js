import { useState } from 'react';

export default function Textarea({ name, value }) {
  const [inputValue, setInputValue] = useState(value);
  return (
    <div className="flex flex-col w-1/2 mt-6">
      <label>
        {name[0].toUpperCase() + name.slice(1)} (please add ; after each{' '}
        {name === 'ingredients' ? 'ingredient' : 'step'}, except last one)
      </label>
      <textarea
        id={name}
        name={name}
        required
        className="bg-gray-200 rounded h-10 outline-none"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
      />
    </div>
  );
}
