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

export default function Home({ recipes }) {
  const { data } = useSWR('/api/recipes', jsonFetcher, { initialData: recipes });
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Layout>
      <Head>
        <title>Recipes</title>
      </Head>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search recipe..."
          className="w-80 outline-none mt-6 rounded text-yellow-800"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
      <div className="flex flex-row flex-wrap justify-around">
        {data
          .filter((val) => {
            if (searchTerm === '') {
              return val;
            } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
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
