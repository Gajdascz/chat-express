import handleFormSubmission from './core/handleFormSubmission.js';

document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form[data-handle="true"]');
  if (forms) {
    forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleFormSubmission(e);
      });
      const formInputs = [...form.querySelectorAll('input, textarea, select')];
      formInputs.forEach((input) => {
        const errContainer = input.nextElementSibling;
        if (errContainer && errContainer.classList.contains('error-container')) errContainer.textContent = '';
        input.addEventListener('change', () => (input.dataset.status = 'pending'));
      });
    });
  } else console.warn(`formHandler script imported on page with no form`);
});
