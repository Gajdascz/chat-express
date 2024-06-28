import {
  isLength,
  isEmail,
  onlyLetters,
  noSpecialChars,
  containsSpecialChar,
  containsLowercase,
  containsUppercase,
  containsDigit,
  isEqual,
  isIn,
  isUnique,
  optional,
} from './rules.js';
import { RECOVERY_QUESTIONS } from '../../../../utils/constants.js';
import { body } from 'express-validator';
const buildChain = (field, config) => config.reduce((chain, validator) => validator(chain), body(field).trim());

const username = {
  field: 'username',
  minLength: 1,
  maxLength: 32,
  getValidationConfig: function () {
    const { minLength, maxLength } = this;
    return [
      (chain) => isLength(chain, minLength, maxLength),
      (chain) => noSpecialChars(chain),
      (chain) => isUnique(chain, this.field, 'User'),
    ];
  },
  getValidationChain: function () {
    return buildChain(this.field, this.getValidationConfig());
  },
};

const password = {
  field: 'password',
  minLength: 8,
  maxLength: 50,
  getValidationConfig: function () {
    const { minLength, maxLength } = this;
    return [
      (chain) => isLength(chain, minLength, maxLength),
      (chain) => containsDigit(chain),
      (chain) => containsLowercase(chain),
      (chain) => containsUppercase(chain),
      (chain) => containsSpecialChar(chain),
    ];
  },
  getValidationChain: function () {
    return buildChain(this.field, this.getValidationConfig());
  },
};

const confirmPassword = {
  field: 'confirmPassword',
  compareField: 'password',
  getValidationConfig: function () {
    return [(chain) => isEqual(chain, this.compareField)];
  },
  getValidationChain: function () {
    return buildChain(this.field, this.getValidationConfig());
  },
};

const firstName = {
  field: 'firstName',
  minLength: 2,
  maxLength: 50,
  getValidationConfig: function () {
    const { minLength, maxLength } = this;
    return [
      (chain) => optional(chain),
      (chain) => chain.escape(),
      (chain) => onlyLetters(chain),
      (chain) => isLength(chain, minLength, maxLength),
    ];
  },
  getValidationChain: function () {
    return buildChain(this.field, this.getValidationConfig());
  },
};

const lastName = {
  field: 'lastName',
  minLength: 2,
  maxLength: 50,
  getValidationConfig: function () {
    const { minLength, maxLength } = this;
    return [
      (chain) => optional(chain),
      (chain) => chain.escape(),
      (chain) => onlyLetters(chain),
      (chain) => isLength(chain, minLength, maxLength),
    ];
  },
  getValidationChain: function () {
    return buildChain(this.field, this.getValidationConfig());
  },
};

const email = {
  field: 'email',
  getValidationConfig: function () {
    return [(chain) => optional(chain), (chain) => chain.escape(), (chain) => isEmail(chain)];
  },
  getValidationChain: function () {
    return buildChain(this.field, this.getValidationConfig());
  },
};

const recoveryQuestion = {
  field: 'recoveryQuestion',
  getValidationConfig: function () {
    return [(chain) => isIn(chain, RECOVERY_QUESTIONS)];
  },
  getValidationChain: function () {
    return buildChain(this.field, this.getValidationConfig());
  },
};

const recoveryQuestionAnswer = {
  field: 'recoveryQuestionAnswer',
  minLength: 3,
  maxLength: 25,
  getValidationConfig: function () {
    const { minLength, maxLength } = this;
    return [(chain) => chain.escape().toLowerCase(), (chain) => isLength(chain, minLength, maxLength)];
  },
  getValidationChain: function () {
    return buildChain(this.field, this.getValidationConfig());
  },
};

export { username, password, confirmPassword, firstName, lastName, email, recoveryQuestion, recoveryQuestionAnswer };
