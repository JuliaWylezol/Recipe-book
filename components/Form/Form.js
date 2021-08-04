import Input from '../Input/Input';
import SelectInput from '../SelectInput/SelectInput';
import Textarea from '../Textarea/Textarea';

export default function Form() {
  return (
    <form className="flex flex-col items-center mt-4 font-serif text-yellow-500">
      <Input type="text" name="name" required />
      <div className="flex  w-1/2">
        <Input type="text" name="url" />
        <div className="flex justify-between mt-6">
          <SelectInput
            name="category"
            options={['breakfast', 'lunch', 'dinner', 'dessert', 'drink', 'snack']}
            required
          />
          <SelectInput name="price" options={['cheap', 'average', 'expensive']} required />
          <SelectInput name="difficulty" options={['easy', 'medium', 'hard']} required />
        </div>
      </div>
      <Textarea name="ingradients" />
      <Textarea name="preparation" />
      <input
        type="submit"
        value="Add recipe"
        className="m-10 p-4 rounded bg-yellow-600 text-gray-200 hover:bg-yellow-700"
      />
    </form>
  );
}
