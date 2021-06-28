const { Usuario, Equipo } = require('../models');

module.exports = async () => {
  const usuarioLider = await Usuario.findOne({
    where: {
      rol: 'lider',
    },
  });

  await Equipo.create({
    nombre: 'Los más capos de Progra Web',
    lista_integrantes: ['Jose', 'André', 'Juliana', 'Carlos', 'Willy'],
    lider_id: usuarioLider.id,
  });
};
