import Layout from '../../components/Layout/Layout';
import getRecipes from '../../services/recipes/getRecipes';
import { getRecipeInfo } from '../../services/recipes/getRecipeInfo';

export const getStaticPaths = async () => {
  const recipes = await getRecipes();
  return {
    paths: recipes.map((recipe) => ({ params: { id: String(recipe.id) } })),
    fallback: false
  };
};

export const getStaticProps = async ({ params }) => {
  const recipe = await getRecipeInfo(params.id);

  return {
    revalidate: 30,
    props: {
      recipe
    }
  };
};

export default function RecipePage({ recipe }) {
  const ingredients = recipe.ingredients.split(';');
  const preparation = recipe.preparation.split(';');
  return (
    <Layout>
      <div className="w-full h-96 flex flex-col items-center mt-12 font-serif">
        <div className="flex justify-between w-1/2">
          <div className="flex flex-col">
            <h2 className="font-nav text-4xl text-yellow-800">{recipe.name}</h2>
            <p className="mt-12 text-lg">Category: {recipe.category}</p>
            <p className="mt-6 text-lg">Price: {recipe.price}</p>
            <p className="mt-6 text-lg">Difficulty: {recipe.difficulty}</p>
          </div>
          <img src={recipe.photo[0].url} className="w-64" alt=""></img>
        </div>
        <div className="flex flex-col w-1/2 mb-4">
          <h3 className="mt-4 text-xl text-yellow-800 mb-6">Ingredients</h3>
          {ingredients.map((ingredient) => (
            <div key={ingredient}>
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 mr-3 inline-block"></span>
              <p className="inline-block">{ingredient}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-1/2 pb-10">
          <h3 className="mt-4 text-xl text-yellow-800 mb-6">Preparation</h3>
          {preparation.map((step) => (
            <div key={step} className="inline-block">
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 mr-3 inline-block"></span>
              <p className="break-words inline-block">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
