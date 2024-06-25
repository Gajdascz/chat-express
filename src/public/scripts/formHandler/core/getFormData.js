export default (e) => {
  const form = e.target;
  if (!form || form.nodeName !== 'FORM') throw new Error(`Form element not found.`);
  const formData = new FormData(form);
  if (!formData) throw new Error(`Couldn't create FormData using provided form.`);
  return { form, formData };
};
