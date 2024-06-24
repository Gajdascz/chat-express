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
  isEnum,
  isUrl,
} from './rules.js';
import { USER_STATUSES } from '../../../utils/constants.js';

const username = {
  props: { selector: 'username', minLength: 1, maxLength: 32 },
  getSchemaType: () => ({
    type: String,
    required: true,
    minLength: username.props.minLength,
    maxLength: username.props.maxLength,
    unique: true,
  }),
  getValidationChain: () => [
    escapeTrim(),
    isLength(username.props.minLength, username.props.maxLength),
    noSpecialChars(),
  ],
};

const password = {
  props: { selector: 'password', minLength: 8, maxLength: 50 },
  getSchemaType: () => ({
    type: String,
    required: true,
    minLength: password.props.minLength,
    maxLength: password.props.maxLength,
  }),
  getValidationChain: () => [
    isLength(password.props.minLength, password.props.maxLength),
    containsDigit(),
    containsLowercase(),
    containsUppercase(),
    containsSpecialChar(),
  ],
};

const firstName = {
  props: { selector: 'first-name', minLength: 2, maxLength: 50 },
  getSchemaType: () => ({
    type: String,
    required: true,
    minLength: firstName.props.minLength,
    maxLength: firstName.props.maxLength,
  }),
  getValidationChain: (isOptional = true) => [
    ...(isOptional ? [optional()] : []),
    escapeTrim(),
    onlyLetters(),
    isLength(firstName.minLength, firstName.maxLength),
  ],
};

const lastName = {
  props: { selector: 'last-name', minLength: 2, maxLength: 50 },
  getSchemaType: () => ({
    type: String,
    required: true,
    minLength: lastName.props.minLength,
    maxLength: lastName.props.maxLength,
  }),
  getValidationChain: (isOptional = true) => [
    ...(isOptional ? [optional()] : []),
    escapeTrim(),
    onlyLetters(),
    isLength(lastName.minLength, lastName.maxLength),
  ],
};

const email = {
  props: { selector: 'email' },
  getSchemaType: () => ({ type: String, required: false }),
  getValidationChain: (isOptional = true) => [...(isOptional ? [optional()] : []), { trim: true }, isEmail()],
};

const status = {
  props: { selector: 'status', values: Object.values(USER_STATUSES) },
  getSchemaType: () => ({ type: String, enum: status.props.values, default: USER_STATUSES.BASIC }),
  getValidationChain: () => [isEnum(status.props.values)],
};

const avatar = {
  props: { selector: 'avatar' },
  getSchemaType: () => ({ publicId: { type: String, required: true }, url: { type: String, required: true } }),
  getValidationChain: () => [{ field: 'avatar.url', chain: [isUrl()] }],
};

export { username, password, firstName, lastName, email, status, avatar };
