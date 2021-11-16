import airDB from '../airtableClient';

export const getRecipeInfo = async (id) => {
  const recipes = await airDB('recipes')
    .select({ filterByFormula: `id="${id}"` })
    .firstPage();

  if (recipes && recipes[0]) {
    return { airtableId: recipes[0].id, ...recipes[0].fields };
  }
};
