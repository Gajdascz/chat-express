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
} from './rules.js';
import { RECOVERY_QUESTIONS } from '../../../../../../utils/constants.js';
import { body } from 'express-validator';
const buildChain = (field, config) => config.reduce((chain, validator) => validator(chain), body(field).trim());

const username = {
  field: 'username',
  minLength: 1,
  maxLength: 32,
  getSchemaType: function () {
    const { minLength, maxLength, field } = this;
    return { [field]: { type: String, required: true, minLength, maxLength, unique: true } };
  },
  getValidationConfig: function () {
    const { minLength, maxLength } = this;
    return [
      (chain) => chain.trim(),
      (chain) => isLength(chain, minLength, maxLength),
      (chain) => noSpecialChars(chain),
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
  getSchemaType: function () {
    const { field, minLength, maxLength } = this;
    return { [field]: { type: String, required: true, minLength, maxLength } };
  },
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
  getSchemaType: () => {},
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
  getSchemaType: function () {
    const { field, minLength, maxLength } = this;
    return { [field]: { type: String, required: true, minLength, maxLength } };
  },
  getValidationConfig: function () {
    const { minLength, maxLength } = this;
    return [
      (chain) => chain.escape(),
      (chain) => chain.optional(true),
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
  getSchemaType: function () {
    const { field, minLength, maxLength } = this;
    return { [field]: { type: String, required: true, minLength, maxLength } };
  },
  getValidationConfig: function () {
    const { minLength, maxLength } = this;
    return [
      (chain) => chain.escape(),
      (chain) => chain.optional(true),
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
  getSchemaType: function () {
    const { field } = this;
    return { [field]: { type: String, required: false } };
  },
  getValidationConfig: function () {
    return [(chain) => chain.escape(), (chain) => chain.optional(true), (chain) => isEmail(chain)];
  },
  getValidationChain: function () {
    return buildChain(this.field, this.getValidationConfig());
  },
};

const recoveryQuestion = {
  field: 'recoveryQuestion',
  getSchemaType: function () {
    const { field } = this;
    return { [field]: { type: String, enum: RECOVERY_QUESTIONS, required: true } };
  },
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
  getSchemaType: function () {
    const { field } = this;
    return { [field]: { type: String, required: false } };
  },
  getValidationConfig: function () {
    const { minLength, maxLength } = this;
    return [(chain) => chain.trim().escape().toLowerCase(), (chain) => isLength(chain, minLength, maxLength)];
  },
  getValidationChain: function () {
    return buildChain(this.field, this.getValidationConfig());
  },
};

export { username, password, confirmPassword, firstName, lastName, email, recoveryQuestion, recoveryQuestionAnswer };
