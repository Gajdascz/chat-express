import {
  escapeTrim,
  optional,
  isLength,
  isEmail,
  onlyLetters,
  noSpecialChars,
  containsSpecialChar,
  containsLowercase,
  containsUppercase,
  containsDigit,
  isEqual,
} from './rules.js';
import { USER_STATUSES } from '../../../../../../utils/constants.js';
import { body } from 'express-validator';

const errorMsg = {
  length: (min, max) => `Must be between ${min} and ${max} characters`,
};

const username = {
  props: { selector: 'username', minLength: 1, maxLength: 32 },
  getSchemaType: function () {
    return {
      [this.props.selector]: {
        type: String,
        required: true,
        minLength: this.props.minLength,
        maxLength: this.props.maxLength,
        unique: true,
      },
    };
  },
  getValidation: function () {
    return [
      body(this.props.selector)
        .trim()
        .escape()
        .isLength({ min: this.minLength, max: this.maxLength })
        .withMessage(errorMsg.length(this.props.minLength, this.props.maxLength))
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(`Must only contain letters, numbers, and/or underscores (_)`),
    ];
  },
};

const password = {
  props: { selector: 'password', minLength: 8, maxLength: 50 },
  getSchemaType: function () {
    return {
      [this.props.selector]: {
        type: String,
        required: true,
        minLength: this.props.minLength,
        maxLength: this.props.maxLength,
      },
    };
  },
  getValidation: function () {
    return [
      body(this.props.selector)
        .trim()
        .isLength({ min: this.props.minLength, max: this.props.maxLength })
        .withMessage(errorMsg.length({ min: this.props.minLength, max: this.props.maxLength }))
        .matches(/\d/)
        .withMessage(`Must contain at least one number`)
        .matches(/[a-z]/)
        .withMessage(`Must contain at least one lower case letter`)
        .matches(/[A-Z]/)
        .withMessage(`Must contain at least one capital letter`)
        .matches(/[!@#$%^&*()-_=+[\]{}|\\;:'",<.>/?]/)
        .withMessage(`Must contain at least one special character`),
    ];
  },
};

const confirmPassword = {
  props: {
    selector: 'confirmPassword',
  },
  getSchemaType: () => {},
  getValidation: function () {
    return [
      body(this.props.selector)
        .trim()
        .custom((value, { req }) => {
          if (value !== req.body.password) throw new Error(`Passwords are not equal.`);
          return true;
        }),
    ];
  },
};

const firstName = {
  props: { selector: 'firstName', minLength: 2, maxLength: 50 },
  getSchemaType: function () {
    return {
      [this.props.selector]: {
        type: String,
        required: true,
        minLength: this.props.minLength,
        maxLength: this.props.maxLength,
      },
    };
  },
  getValidation: function (isOptional = true) {
    return [
      body(this.props.selector)
        .trim()
        .escape()
        .optional(isOptional)
        .matches(/^[a-zA-Z]$/)
        .withMessage(`Must only contain letters`)
        .isLength({ min: this.props.minLength, max: this.props.maxLength }),
    ];
  },
};

const lastName = {
  props: { selector: 'lastName', minLength: 2, maxLength: 50 },
  getSchemaType: function () {
    return {
      [this.props.selector]: {
        type: String,
        required: true,
        minLength: this.props.minLength,
        maxLength: this.props.maxLength,
      },
    };
  },
  getValidation: function (isOptional = true) {
    return [
      body(this.props.selector)
        .trim()
        .escape()
        .optional(isOptional)
        .matches(/^[a-zA-Z]$/)
        .withMessage(`Must only contain letters`)
        .isLength({ min: this.props.minLength, max: this.props.maxLength }),
    ];
  },
};

const email = {
  props: { selector: 'email' },
  getSchemaType: function () {
    return {
      [this.props.selector]: {
        type: String,
        required: false,
      },
    };
  },
  getValidation: function (isOptional = true) {
    return [
      body(this.props.selector)
        .trim()
        .escape()
        .optional(isOptional)
        .isEmail()
        .withMessage(`Must be a correctly formatted email address`)
        .isLength({ min: this.props.minLength, max: this.props.maxLength }),
    ];
  },
};

const status = {
  props: { selector: 'status', values: Object.values(USER_STATUSES) },
  getSchemaType: function () {
    return { [this.props.selector]: { type: String, enum: this.props.values, default: USER_STATUSES.BASIC } };
  },
  getValidation: () => {},
};

const avatar = {
  props: { selector: 'avatar' },
  getSchemaType: function () {
    return { [this.props.selector]: { url: { type: String, required: true } } };
  },
  getValidation: () => {},
};

export { username, password, confirmPassword, firstName, lastName, email, status, avatar };
