import getRecipes from '../../../services/recipes/getRecipes';
import createRecipe from '../../../services/recipes/create';
import { getSession } from 'next-auth/client';

export default async (req, res) => {
  console.log('in');
  switch (req.method) {
    case 'GET': {
      const recipes = await getRecipes();
      res.status(200).json(recipes);

      break;
    }
    case 'POST': {
      // console.log('post');
      try {
        const session = await getSession({ req });
        // console.log('session post');
        if (!session) {
          return res.status(401).json({ error: 'not_authorized' });
        }
        const payload = req.body;
        // console.log(`${payload} payload`);

        const userEmail = session.user.email;
        console.log(`${session.user} session`);
        const recipe = await createRecipe(payload, userEmail);
        console.log(`${recipe} recipe`);
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
