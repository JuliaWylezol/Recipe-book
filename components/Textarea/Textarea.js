export default function Textarea({ name }) {
  return (
    <div className="flex flex-col w-1/2 mt-6">
      <label>
        {name[0].toUpperCase() + name.slice(1)} (please add ; after each{' '}
        {name === 'ingredients' ? 'ingredient' : 'step'}, except last one)
      </label>
      <textarea id={name} name={name} required className="bg-gray-200 rounded h-10 outline-none" />
    </div>
  );
}
