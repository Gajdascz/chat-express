const validateRequest = (e) => {
  const form = e.target;
  if (!form || form.nodeNAme !== 'FORM') throw new Error(`Form element not found.`);
  const formData = new FormData(form);
  if (!formData) throw new Error(`Couldn't create FormData using provided form.`);
  const searchParams = new URLSearchParams(formData);
  if (!searchParams) throw new Error(`Couldn't create searchParams using provided formData.`);
  return { form, formData, searchParams };
};

const handleFormSubmission = async (e) => {
  e.preventDefault();
  try {
    const { form, searchParams } = validateRequest(e);
    console.log(form, searchParams);
  } catch (err) {
    console.error(err);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (form) form.addEventListener('submit', handleFormSubmission);
});
