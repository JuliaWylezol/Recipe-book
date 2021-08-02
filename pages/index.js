import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import getRecipes from '../services/recipes/getRecipes';
import Tag from '../components/Tag/Tag';

export const getStaticProps = async () => {
  const recipes = await getRecipes();
  return {
    props: {
      recipes
    }
  };
};

export default function Home({ recipes }) {
  console.log(recipes);
  return (
    <Layout>
      <Head>
        <title>Recipes</title>
      </Head>
      <div className="flex flex-row justify-around">
        {recipes.map((recipe) => (
          <div className="flex flex-col rounded-xl h-auto m-8 shadow md:w-80 bg-white p-2 text-center hover:bg-yellow-200 items-center">
            <h2 className="text-xl text-yellow-800">{recipe.name}</h2>
            <img src={recipe.photo[0].url} className="w-40 h-40 mt-4 mb-2" />
            <div className="flex flex-row">
              <Tag tagName={recipe.category} />
              <Tag tagName={recipe.difficulty} />
              <Tag tagName={recipe.price} />
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
