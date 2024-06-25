import getFormData from './getFormData.js';
import updateFormUi from './updateFormUi.js';

export default async (e) => {
  e.preventDefault();
  try {
    const { form, formData } = getFormData(e);
    const actionRoute = form.action.replace(window.location.origin, '');
    const res = await fetch(actionRoute, {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();
    updateFormUi(form, json.errors ?? []);
  } catch (err) {
    console.error(err);
  }
};
