export default (e) => {
  const form = e.target;
  if (!form || form.nodeName !== 'FORM') throw new Error(`Form element not found.`);

  const result = {
    formInputs: [],
    fetchOptions: {
      method: 'POST',
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      body: null,
    },
    actionRoute: form.action.replace(window.location.origin, ''),
  };

  result.formInputs = [...form.querySelectorAll('input, textarea, select')];
  if (result.formInputs.length <= 0) console.warn(`Could not select inputs in form ${form.id}`);

  const formData = new FormData(form);
  if (!formData) throw new Error(`Couldn't create FormData using provided form.`);

  const fileInput = form.querySelector(`input[type='file']`);
  if (!fileInput) {
    result.fetchOptions.body = new URLSearchParams(formData);
    if (!result.fetchOptions.body) throw new Error(`Couldn't create URLSearchParams from formData`);
    result.fetchOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  } else result.fetchOptions.body = formData;

  return result;
};
