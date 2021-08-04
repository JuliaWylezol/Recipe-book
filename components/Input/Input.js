export default function Input({ type, name, required, style }) {
  const defaultStyle = `bg-gray-200 rounded h-10 outline-none ${style}`;
  const label = name === 'url' ? 'Photo url' : name;
  return (
    <div className="flex flex-col w-1/2 mt-6">
      <label>{label[0].toUpperCase() + label.slice(1)} </label>
      <input type={type} id={name} name={name} required={required} className={defaultStyle} />
    </div>
  );
}
