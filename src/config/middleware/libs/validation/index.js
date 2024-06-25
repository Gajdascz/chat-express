import { username, password, firstName, lastName, email, status, avatar } from './definitions/base/fields.js';

const user = {
  all: [username, password, firstName, lastName, email, status, avatar],
  fieldSchemas: {
    model: {},
    validation: {},
  },
  populateFieldSchemas: function () {
    this.all.forEach((field) => {
      this.fieldSchemas.model = { ...this.fieldSchemas.model, ...field.getSchemaType() };
      this.fieldSchemas.validation = { ...this.fieldSchemas.validation, ...field.getValidation() };
    });
  },
};

user.populateFieldSchemas();
const userModelFieldSchemas = { ...user.fieldSchemas.model };
const userValidationFieldSchemas = { ...user.fieldSchemas.validation };
export { user, userModelFieldSchemas, userValidationFieldSchemas };
