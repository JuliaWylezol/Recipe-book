import Head from 'next/head';
import useSWR from 'swr';
import Layout from '../components/Layout/Layout';
import RecipeShortcut from '../components/Recipe/RecipeShortcut';
import getRecipes from '../services/recipes/getRecipes';
import { jsonFetcher } from '../utils/index';
import { useState } from 'react';

export const getStaticProps = async () => {
  const recipes = await getRecipes();
  return {
    props: {
      recipes
    }
  };
};

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

export default function Home({ recipes }) {
  const { data } = useSWR('/api/recipes', jsonFetcher, { initialData: recipes });
  const [searchTerm, setSearchTerm] = useState('');
  const [tagTerm, setTagTerm] = useState('');

  return (
    <Layout>
      <Head>
        <title>Recipes</title>
      </Head>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search recipe..."
          className="w-80 outline-none mt-6 rounded text-gray-400"
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
      <div className="flex flex-row flex-wrap justify-around">
        {data
          .filter((val) => {
            if (searchTerm === '' && tagTerm === '') {
              return val;
            } else if (
              tagTerm === '' &&
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            } else if (val.category.toLowerCase() === tagTerm.toLowerCase()) {
              return val;
            } else if (val.difficulty.toLowerCase() === tagTerm.toLowerCase()) {
              return val;
            } else if (val.price.toLowerCase() === tagTerm.toLowerCase()) {
              return val;
            }
          })
          .map((recipe) => (
            <RecipeShortcut
              name={recipe.name}
              photo={recipe.photo[0].url}
              category={recipe.category}
              difficulty={recipe.difficulty}
              price={recipe.price}
              key={recipe.id}
              id={recipe.id}
            />
          ))}
      </div>
    </Layout>
  );
}
