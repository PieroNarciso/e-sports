const { Usuario } = require('../models');
const { User } = require('../mongo');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../config/env');


module.exports = async () => {
  await require('../mongo/db')();
  const users = 
    [
    {
      nombre_completo: 'Pepe Gonzales',
      correo: 'ppelcrack@gmail.com',
      password: bcrypt.hashSync('pepegonzales', SALT_ROUNDS),
      rol: 'admin',
    },
    {
      nombre_completo: 'Armando Barreras',
      correo: 'abarreras@gmail.com',
      password: bcrypt.hashSync('abarreras', SALT_ROUNDS),
      rol: 'org',
    },
    {
      nombre_completo: 'Jose Cardenas',
      correo: 'jcardenas@gmail.com',
      password: bcrypt.hashSync('jcardenas', SALT_ROUNDS),
      rol: 'lider',
    },
    {
      nombre_completo: 'Alessandra Nuñez',
      correo: 'anunez@gmail.com',
      password: bcrypt.hashSync('anunez', SALT_ROUNDS),
      rol: 'org',
    },
  ]
  await User.deleteMany();
  for (let user of users) {
    await User.create({
      email: user.correo,
      password: user.password,
    });
  }
  await Usuario.bulkCreate(users);
};
