export default (formInputs, errors) => {
  formInputs.forEach((input) => {
    input.dataset.status = 'valid';
    input.nextElementSibling.textContent = '';
  });
  const inputsMap = formInputs.reduce((acc, curr) => {
    acc[curr.name] = curr;
    return acc;
  }, {});
  errors.forEach((err) => {
    const input = inputsMap[err.path];
    if (!input) return console.warn(`Selector: ${err.path} did not find a valid element.`);
    input.dataset.status = 'invalid';
    const errMsg = document.createElement('p');
    errMsg.textContent = err.msg;
    input.nextElementSibling.appendChild(errMsg);
  });
};
