import getRecipes from '../../../services/recipes/getRecipes';
import createRecipe from '../../../services/recipes/create';

export default async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const recipes = await getRecipes();
      res.status(200).json(recipes);

      break;
    }
    case 'POST': {
      const payload = req.body;
      const recipe = await createRecipe(payload);
      res.status(200).json({ status: 'created', recipe });

      break;
    }
    default:
      res.status(400);
  }
};
