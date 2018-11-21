const frisby = require('frisby');
const Joi = frisby.Joi; // Frisby exports Joi for convenience on type assersions

const user = {
  email: 'example2@example.com',
  password: '123456',
  firstName: 'Juan',
  lastName: 'Perez',
  birthday: '2001-10-25',
};

it('Registro de Usuario', function () {
  return frisby
    .post('http://localhost:3000/user/save', user)
    .expect('status', 200)
    .expect('json', 'status', true)
    .expect('jsonTypes', 'content[0]', {
      command: "message",
      type: "info",
      content: "user registrado"
    })
    .expect('jsonTypes', 'content[1]', {
      email: user.email,
      password: '*****',
      firstName: user.firstName,
      lastName: user.lastName
    })
    .then(response => {
      console.log(response);
    })
});