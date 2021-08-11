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
  // const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout>
      <Head>
        <title>Recipes</title>
      </Head>
      {/* {isLoading && (
        <div className="rounded w-52 h-12 bg-yellow-500 text-gray-100 text-xl sticky top-1/2 left-1/2 text-center">
          ...Loading recipe
        </div>
      )} */}
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
