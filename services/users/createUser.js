import airDB from '../airtableClient';
import Joi from 'joi';
import crypto from 'crypto';

const schema = Joi.object({
  email: Joi.string().email().required(),
  fullName: Joi.string().required(),
  password: Joi.string().required()
});

const checkEmail = async (email) => {
  const existingUser = await airDB('users')
    .select({ filterByFormula: `email="${email}"` })
    .firstPage();

  if (existingUser && existingUser[0]) {
    throw new Error('This email is already taken');
  }
};

const createUser = async (payload) => {
  const { email, fullName, password } = await schema.validateAsync(payload);
  await checkEmail(email);
  const passwordSalt = crypto.randomBytes(16).toString('hex');
  const passwordHash = crypto
    .pbkdf2Sync(password, passwordSalt, 1000, 64, 'sha512')
    .toString('hex');
  const user = await airDB('users').create([
    {
      fields: {
        email,
        fullName,
        passwordSalt,
        passwordHash
      }
    }
  ]);
  return user;
};

export default createUser;
