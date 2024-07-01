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
  isUnique,
  optional,
} from './rules.js';
import { body } from 'express-validator';
import { USER_STATUSES } from '../../../../utils/constants.js';
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
const userUpgradeAnswer = {
  field: 'userUpgradeAnswer',
  getValidationChain: function () {
    return buildChain(this.field, [
      (chain) =>
        chain
          .custom((answer) => answer === process.env.MEMBERSHIP_QUESTION_ANSWER)
          .withMessage(`Incorrect Answer. If you can't figure out it out, check the source html of this form.`),
      (chain) =>
        chain
          .custom((value, { req }) => req.user.status === USER_STATUSES.BASIC)
          .withMessage(`You're already a member.`),
    ]);
  },
};

export { username, password, confirmPassword, firstName, lastName, email, userUpgradeAnswer };
