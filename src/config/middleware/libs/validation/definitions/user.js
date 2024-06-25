import { checkSchema } from 'express-validator';
import processValidationResult from './base/processValidationResult.js';
import { username, password, firstName, lastName, email, status, avatar, confirmPassword } from './base/fields.js';

const userRegistrationValidationSchema = [username, password, confirmPassword, firstName, lastName, email]
  .map((field) => field.getValidation())
  .reduce((acc, curr) => ({ ...acc, ...curr }));

const userModelSchemaTypes = [username, password, confirmPassword, firstName, lastName, email, status, avatar]
  .map((field) => field.getSchemaType())
  .reduce((acc, curr) => ({ ...acc, ...curr }));

console.log(userRegistrationValidationSchema);
const userRegistrationMiddleware = [checkSchema(userRegistrationValidationSchema), processValidationResult];

export { userModelSchemaTypes, userRegistrationMiddleware };
