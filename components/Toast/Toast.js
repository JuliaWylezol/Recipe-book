export default function Toast({ type }) {
  return (
    <div className="absolute top-0 animate-drop bg-yellow-300 p-6 text-yellow-800 rounded">
      {type === 'recipe'
        ? 'Recipe was successfully added to the library!'
        : 'You are registered! Now you can log into your account.'}
    </div>
  );
}
