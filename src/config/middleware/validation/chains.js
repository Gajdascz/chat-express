import { username, password, firstName, lastName, email, confirmPassword, userUpgradeAnswer } from './core/fields.js';
import processValidationResult from './core/processValidationResult.js';

const userRegistrationValidationChain = [username, password, confirmPassword, firstName, lastName, email].map((field) =>
  field.getValidationChain()
);
userRegistrationValidationChain.push(processValidationResult);

const userUpgradeValidationChain = [userUpgradeAnswer.getValidationChain(), processValidationResult];

export { userRegistrationValidationChain, userUpgradeValidationChain };
