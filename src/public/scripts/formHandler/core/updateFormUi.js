export default (form, errors) => {
  const formInputs = [...form.querySelectorAll('input, textarea, select')];
  formInputs.forEach((input) => {
    input.dataset.status = 'valid';
    input.nextElementSibling.textContent = '';
  });
  errors.forEach((err) => {
    const input = form.querySelector(`[name=${err.path}]`);
    if (!input) throw new Error(`Selector: ${err.path} did not find a valid element.`);
    input.dataset.status = 'invalid';
    const errMsg = document.createElement('p');
    errMsg.textContent = err.msg;
    input.nextElementSibling.appendChild(errMsg);
  });
};
