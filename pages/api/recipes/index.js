import getRecipes from '../../../services/recipes/getRecipes';
import createRecipe from '../../../services/recipes/create';
import { getSession } from 'next-auth/client';

export default async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const recipes = await getRecipes();
      res.status(200).json(recipes);

      break;
    }
    case 'POST': {
      try {
        const session = await getSession({ req });
        if (!session) {
          return res.status(401).json({ error: 'not_authorized' });
        }
        const payload = req.body;
        const userId = session.user.id;
        const recipe = await createRecipe(payload, userId);
        res.status(200).json({ status: 'created', recipe });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }
      break;
    }
    default:
      res.status(400);
  }
};
