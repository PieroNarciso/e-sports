const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../config/env');


module.exports = async () => {
  await Usuario.bulkCreate([
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
  ]);
};
