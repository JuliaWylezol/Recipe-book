import { useState } from 'react';

const tags = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Drink',
  'Snack',
  'Cheap',
  'Average',
  'Expensive',
  'Easy',
  'Medium',
  'Hard'
];

export default function SearchArea() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tagTerm, setTagTerm] = useState('');

  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Search recipe..."
        className="w-80 outline-none mt-6 rounded text-gray-400 pl-2"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <select
        id="tags"
        name="tags"
        className="bg-white rounded mt-6 ml-2 h-10 outline-none text-gray-400 w-48"
        onChange={(event) => setTagTerm(event.target.value)}>
        <option value="">Search by tag</option>
        {tags.map((option) => (
          <option value={option} key={option}>
            {option[0].toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
