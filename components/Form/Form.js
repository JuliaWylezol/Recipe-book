import { useRef } from 'react';
import Input from '../Input/Input';
import SelectInput from '../SelectInput/SelectInput';
import Textarea from '../Textarea/Textarea';

export default function Form() {
  const recipeForm = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(recipeForm.current);
    const payload = {
      name: form.get('name'),
      photo: [{ url: form.get('url') }],
      category: form.get('category'),
      price: form.get('price'),
      difficulty: form.get('difficulty'),
      ingredients: form.get('ingredients'),
      preparation: form.get('preparation')
    };
    await fetch('/api/recipes', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };
  return (
    <form
      className="flex flex-col items-center mt-4 font-serif text-yellow-500"
      ref={recipeForm}
      onSubmit={handleSubmit}>
      <Input type="text" name="name" required />
      <div className="flex  w-1/2">
        <Input type="text" name="url" />
        <div className="flex justify-between mt-6">
          <SelectInput
            name="category"
            options={['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Drink', 'Snack']}
            required
          />
          <SelectInput name="price" options={['Cheap', 'Average', 'Expensive']} required />
          <SelectInput name="difficulty" options={['Easy', 'Medium', 'Hard']} required />
        </div>
      </div>
      <Textarea name="ingredients" />
      <Textarea name="preparation" />
      <input
        type="submit"
        value="Add recipe"
        className="m-10 p-4 rounded bg-yellow-600 text-gray-200 hover:bg-yellow-700"
      />
    </form>
  );
}
