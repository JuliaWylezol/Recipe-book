import Head from 'next/head';
import useSWR from 'swr';
import Layout from '../components/Layout/Layout';
import RecipeShortcut from '../components/Recipe/RecipeShortcut';
import getRecipes from '../services/recipes/getRecipes';
import { jsonFetcher } from '../utils/index';

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
  return (
    <Layout>
      <Head>
        <title>Recipes</title>
      </Head>
      <div className="flex flex-row flex-wrap justify-around">
        {data.map((recipe) => (
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
