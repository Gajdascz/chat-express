import { username, password, firstName, lastName, email, status, avatar } from './definitions/fields.js';

const userAll = [username, password, firstName, lastName, email, status, avatar];
const userSchemaTypes = { ...userAll.map((user) => user.getSchemaType()) };
const userValidationChain = userAll.map((user) => user.getValidationChain());

export { userSchemaTypes, userValidationChain };
