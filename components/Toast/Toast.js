export default function Toast({ type }) {
  const message = {
    recipe: 'Recipe was successfully added to the library!',
    register: 'You are registered! Now you can log into your account.',
    edit: `You've updated your recipe!`,
    delete: `You've deleted your recipe!`
  };
  const typeOfMsg = type;
  return (
    <div className="absolute top-0 animate-drop bg-yellow-300 p-6 text-yellow-800 rounded">
      {message[typeOfMsg]}
    </div>
  );
}
