// Original from https://teamtreehouse.com/library/registering-names

var registrar = {
  form: document.getElementById('registrar'),
  input: registrar.form.querySelector('input')
};

registrar.form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(input.value);
});
