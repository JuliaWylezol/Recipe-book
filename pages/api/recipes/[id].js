import deleteRecipe from '../../../services/recipes/delete';
import editRecipe from '../../../services/recipes/edit';
import { getRecipeInfo } from '../../../services/recipes/getRecipeInfo';
import isAuthorized from '../../../services/recipes/isAuthorized';
import { getSession } from 'next-auth/client';

export default async (req, res) => {
  const session = await getSession({ req });
  let recipe = await getRecipeInfo(req.query.id);
  if (!isAuthorized(recipe, session)) {
    return res.status(401).json({ error: 'not_authorized' });
  }

  switch (req.method) {
    case 'DELETE': {
      try {
        recipe = await deleteRecipe(recipe.airtableId);
        res.status(200).json({ status: 'deleted', recipe });
      } catch (error) {
        res.status(422).json({ status: 'not_deleted', error });
      }
      break;
    }
    case 'PUT': {
      try {
        const payload = req.body;
        recipe = await editRecipe(recipe.airtableId, payload);
        res.status(200).json({ status: 'edited', recipe });
      } catch (error) {
        res.status(422).json({ status: 'not_edited', error });
      }
      break;
    }

    default:
      res.status(400);
  }
};
