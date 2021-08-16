/* eslint-disable react/no-unescaped-entities */
import getByUser from '../../services/recipes/getByUser';
import { getSession } from 'next-auth/client';
import { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import RecipeShortcut from '../../components/Recipe/RecipeShortcut';
import search from '../../services/recipes/search';

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

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permament: false
      }
    };
  }
  const recipes = await getByUser(session.user.email);
  return {
    props: {
      recipes: recipes
    }
  };
};

export default function My({ recipes }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [tagTerm, setTagTerm] = useState('');
  return (
    <Layout>
      <h1 className="font-nav text-yellow-800 text-4xl text-center mt-8">My recipes</h1>
      <div className="flex justify-center mt-4">
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
      <div className="flex flex-row flex-wrap justify-around">
        {recipes.length === 0 && (
          <h2 className="mt-20 text-xl bg-yellow-500 py-2 px-36 text-gray-100">
            You don't have any recipes.
          </h2>
        )}
        {recipes
          .filter((val) => search(val, searchTerm, tagTerm))
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
