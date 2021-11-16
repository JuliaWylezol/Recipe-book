import airDB from '../airtableClient';
import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().required(),
  photo: Joi.array().items({ url: Joi.string().required() }),
  category: Joi.string()
    .valid('Breakfast', 'Dinner', 'Lunch', 'Dessert', 'Drink', 'Snack')
    .required(),
  price: Joi.string().valid('Cheap', 'Average', 'Expensive').required(),
  difficulty: Joi.string().valid('Easy', 'Medium', 'Hard').required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required()
});

const create = async (payload, userId) => {
  const validateRecipe = await schema.validateAsync(payload);
  const recipe = await airDB('recipes').create([
    {
      fields: {
        ...validateRecipe,
        email: [userId]
      }
    }
  ]);

  return recipe;
};

export default create;
