import {
  username,
  password,
  firstName,
  lastName,
  email,
  confirmPassword,
  recoveryQuestion,
  recoveryQuestionAnswer,
} from './core/fields.js';

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

export { userRegistrationValidationChain };
