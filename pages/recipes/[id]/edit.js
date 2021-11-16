import { getSession } from 'next-auth/client';
import Head from 'next/head';
import Layout from '../../../components/Layout/Layout';
import { getRecipeInfo } from '../../../services/recipes/getRecipeInfo';
import Input from '../../../components/Input/Input';
import SelectInput from '../../../components/SelectInput/SelectInput';
import Textarea from '../../../components/Textarea/Textarea';
import Toast from '../../../components/Toast/Toast';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

export const getServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req });
  const recipe = await getRecipeInfo(query.id);
  return {
    props: {
      recipe
    }
  };
};

export default function RecipeEdit({ recipe }) {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isToastActive, setIsToastActive] = useState(false);
  const recipeForm = useRef();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    const form = new FormData(recipeForm.current);
    const payload = {
      name: form.get('name'),
      photo: [{ url: form.get('url') }],
      category: form.get('category'),
      price: form.get('price'),
      difficulty: form.get('difficulty'),
      ingredients: form.get('ingredients'),
      preparation: form.get('preparation'),
      email: [recipe.email[0]]
    };
    await fetch(`/api/recipes/${recipe.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    setIsToastActive(true);
    setTimeout(() => {
      setIsSubmit(false);
      setIsToastActive(false);
      router.push(`/recipes/${recipe.id}`);
    }, 1500);
  };

  return (
    <Layout>
      <Head>
        <title>Edit Recipe</title>
      </Head>
      <h1 className="text-yellow-800 text-4xl font-nav text-center mt-16">Edit your recipe</h1>
      <form
        className="flex flex-col items-center mt-4 font-serif text-yellow-500"
        ref={recipeForm}
        onSubmit={handleSubmit}>
        <Input type="text" name="name" required value={recipe.name} />
        <div className="flex  w-1/2">
          <Input type="text" name="url" value={recipe.photo[0].url} />
          <div className="flex justify-between mt-6">
            <SelectInput
              name="category"
              options={['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Drink', 'Snack']}
              required
              value={recipe.category}
            />
            <SelectInput
              name="price"
              options={['Cheap', 'Average', 'Expensive']}
              required
              value={recipe.price}
            />
            <SelectInput
              name="difficulty"
              options={['Easy', 'Medium', 'Hard']}
              required
              value={recipe.difficulty}
            />
          </div>
        </div>
        <Textarea name="ingredients" value={recipe.ingredients} />
        <Textarea name="preparation" value={recipe.preparation} />
        <input
          type="submit"
          value={isSubmit ? '...Editing your recipe' : 'Edit recipe'}
          className="m-10 p-4 rounded bg-yellow-600 text-gray-200 hover:bg-yellow-700"
        />
        {isToastActive && <Toast type="recipe" />}
      </form>
    </Layout>
  );
}
