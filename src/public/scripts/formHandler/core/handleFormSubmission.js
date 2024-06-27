import parseForm from './parseForm.js';
import updateFormUi from './updateFormUi.js';

export default async (e) => {
  e.preventDefault();
  try {
    const { actionRoute, formInputs, fetchOptions } = parseForm(e);
    const res = await fetch(actionRoute, fetchOptions);
    const json = await res.json();
    if (json.redirect) return location.assign(json.redirect);
    updateFormUi(formInputs, json.errors ?? []);
  } catch (err) {
    console.error(err);
  }
};
