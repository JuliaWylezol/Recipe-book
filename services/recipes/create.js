import airDB from '../airtableClient';

const create = async (payload) => {
  const recipe = await airDB('recipes').create([
    {
      fields: {
        ...payload
      }
    }
  ]);
  return recipe;
};

export default create;
