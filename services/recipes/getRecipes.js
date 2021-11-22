import airDB from '../airtableClient';

const getRecipes = async () => {
  const recipes = await airDB('recipes')
    .select({
      sort: [{ field: 'name', direction: 'asc' }]
    })
    .firstPage();
  return recipes.map((recipe) => recipe.fields);
};

export default getRecipes;
