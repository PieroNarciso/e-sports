const { Torneo, Usuario, Equipo } = require('../models');

module.exports = async () => {
  const usuario = await Usuario.findOne({
    where: {
      rol: 'org',
    },
  });
  const equipo = await Equipo.findOne();
  const torneo = await Torneo.create({
    nombre: 'Torneo ULima',
    fec_inicio: new Date(2021, 06, 18),
    fec_fin: new Date(2021, 06, 28),
    max_participantes: 6,
    descripcion: 'Torneo 1.',
    estado: 'abierto',
    cant_particip_diarios: 4,
    tipo: 'Todos contra todos',
    puntaje_perdedor: 1,
    puntaje_ganador: 3,
    puntaje_empate: 2,
    organizador_id: usuario.id
  });
  await torneo.addEquipo(equipo, { through: { estado: 'activo' } });

  const torneo2 = await Torneo.create({
    nombre: 'Torneo 2',
    fec_inicio: new Date(2021, 06, 18),
    fec_fin: new Date(2021, 06, 28),
    max_participantes: 6,
    descripcion: 'Torneo 2.',
    estado: 'abierto',
    cant_particip_diarios: 4,
    tipo: 'Todos contra todos',
    puntaje_perdedor: 1,
    puntaje_ganador: 3,
    puntaje_empate: 2,
    organizador_id: usuario.id
  });
  await torneo2.addEquipo(equipo, { through: { estado: 'activo' } });

  const torneo3 = await Torneo.create({
    nombre: 'Torneo 3',
    fec_inicio: new Date(2021, 06, 18),
    fec_fin: new Date(2021, 06, 28),
    max_participantes: 6,
    descripcion: 'Torneo 3.',
    estado: 'abierto',
    cant_particip_diarios: 4,
    tipo: 'Todos contra todos',
    puntaje_perdedor: 1,
    puntaje_ganador: 3,
    puntaje_empate: 2,
    organizador_id: usuario.id
  });
};
