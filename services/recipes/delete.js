import airDB from '../airtableClient';

const deleteRecipe = async (airtableId) => {
  console.log(airtableId);
  const recipe = await airDB('recipes').destroy([airtableId]);
  return recipe;
};

export default deleteRecipe;
