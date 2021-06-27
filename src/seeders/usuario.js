const { Usuario } = require('../models');

module.exports = async () => {
  await Usuario.bulkCreate([
    {
      nombre_completo: 'Pepe Gonzales',
      correo: 'ppelcrack@gmail.com',
      contraseña: 'ppelcrack',
      rol: 'admin',
    },
    {
      nombre_completo: 'Armando Barreras',
      correo: 'abarreras@gmail.com',
      contraseña: 'abarreras',
      rol: 'org',
    },
    {
      nombre_completo: 'Jose Cardenas',
      correo: 'jcardenas@gmail.com',
      contraseña: 'jcaradenas',
      rol: 'lider',
    },
  ]);
};
