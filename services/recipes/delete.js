import airDB from '../airtableClient';

const deleteRecipe = async (id) => {
  await airDB('recipes').destroy([`${id}`], function (err, deletedRecipe) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('deleted recipe', deletedRecipe);
  });
};

export default deleteRecipe;
