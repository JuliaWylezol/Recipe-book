import getRecipes from '../../../services/recipes/getRecipes';

export default async (req, res) => {
  const recipes = await getRecipes();
  res.status(200).json(recipes);
};
