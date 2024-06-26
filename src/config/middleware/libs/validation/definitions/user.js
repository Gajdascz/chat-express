import processValidationResult from './base/processValidationResult.js';
import {
  username,
  password,
  firstName,
  lastName,
  email,
  confirmPassword,
  recoveryQuestion,
  recoveryQuestionAnswer,
} from './base/fields.js';
import { setHashKeys, hash } from './base/hash.js';

const userRegistrationValidationChain = [
  username,
  password,
  confirmPassword,
  firstName,
  lastName,
  email,
  recoveryQuestion,
  recoveryQuestionAnswer,
].map((field) => field.getValidationChain());

const userModelSchemaTypes = [username, password, firstName, lastName, email, recoveryQuestion, recoveryQuestionAnswer]
  .map((field) => field.getSchemaType())
  .reduce((acc, curr) => ({ ...acc, ...curr }));

const deleteConfirmPassword = (req, res, next) => {
  delete req.body.confirmPassword;
  next();
};

const userRegistrationMiddleware = [
  userRegistrationValidationChain,
  processValidationResult,
  deleteConfirmPassword,
  setHashKeys(['password', 'recoveryQuestionAnswer']),
  hash,
];

export { userModelSchemaTypes, userRegistrationMiddleware };
