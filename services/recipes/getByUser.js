import airDb from '../airtableClient';

const getByUser = async (email) => {
  const recipes = await airDb('recipes')
    .select({
      sort: [{ field: 'name', direction: 'asc' }],
      filterByFormula: `email="${email}"`
    })
    .firstPage();

  return recipes.map((recipe) => recipe.fields);
};

export default getByUser;
