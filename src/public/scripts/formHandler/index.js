import handleFormSubmission from './core/handleFormSubmission.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', handleFormSubmission);
    const formInputs = [...form.querySelectorAll('input, textarea, select')];
    formInputs.forEach((input) => {
      input.nextElementSibling.textContent = '';
      input.addEventListener('change', () => {
        input.dataset.status = 'pending';
      });
    });
  } else console.warn(`formHandler script imported on page with no form`);
});
