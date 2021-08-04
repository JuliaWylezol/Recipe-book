export default function SelectInput({ name, options }) {
  return (
    <div className="flex flex-col w-1/2 ml-4 mr-4">
      <label>{name[0].toUpperCase() + name.slice(1)} </label>
      <select className="bg-gray-200 rounded h-10 outline-none">
        <option value=""></option>
        {options.map((option) => (
          <option value={option}>{option[0].toUpperCase() + option.slice(1)}</option>
        ))}
      </select>
    </div>
  );
}
