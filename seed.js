// CORRER CON "" node seed ""

const { sequelize, Equipo, Partida, Ronda, Torneo, Usuario } = require('./src/models');

// USUARIOS
const usuarios = [
  // ADMIN id 1
  { nombre_completo: 'Pepe Gonzales', correo: 'ppelcrack@gmail.com', contraseña: 'ppelcrack', rol: 'admin' },
  // ORGANIZADOR (LO DEBERÍA PODER CREAR EL ADMIN) id 2
  { nombre_completo: 'Armando Barreras', correo: 'abarreras@gmail.com', contraseña: 'abarreras', rol: 'org' },
  // LIDER id 3
  { nombre_completo: 'Jose Cardenas', correo: 'jcardenas@gmail.com', contraseña: 'jcaradenas', rol: 'lider' }
];

// TORNEOS
const torneos = [
  // id 1
  {
    nombre: 'Torneo ULima', fec_inicio: new Date(2021, 06, 18), fec_fin: new Date(2021, 06, 28),
      max_participantes: 6, descripcion: 'Torneo 1.', estado: 'activo', cant_particip_diarios: 4,
      tipo: 'Todos contra todos', puntaje_perdedor: 1, puntaje_ganador: 3, puntaje_empate: 2,
      organizador_id: 2
  }   
];
// EQUIPOS
const equipos = [
  // id 1
  {
    nombre: 'Los más capos de Progra Web', lista_integrantes: ['Jose', 'André', 'Juliana', 'Carlos', 'Willy'],
      Equipos_lider_id_fkey: 3
  }
];

// PARTIDAS

// RONDAS


// CREANDO REGISTROS
const main = async () => {
  try {
    await sequelize.sync({ force: true});

    usuarios.forEach(async usr => {
      try {
        await Usuario.create(usr);
      } catch(err) {
        console.log(err);
      }
    });

    torneos.forEach(async torneo => {
      try {
      await Torneo.create(torneo);
      } catch(err) {
        console.log(err);
      }
    });

    equipos.forEach(async equipo => {
      try {
        await Equipo.create(equipo);
      } catch(err) {
        console.log(err);
      }
    });
    // FORMA 1 DE AGREGAR

    const equipo2 = await Equipo.create( // id 2
      {
        nombre: 'Equipo 2', lista_integrantes: ['I1', 'I2', 'I3', 'I4'],
          Equipos_lider_id_fkey: 3
      })
    const torneo2 = await Torneo.create({ // id 2
      nombre: 'Torneo 2', fec_inicio: new Date(2021, 06, 17), fec_fin: new Date(2021, 06, 24),
      max_participantes: 6, descripcion: 'Torneo 2.', estado: 'activo', cant_particip_diarios: 4,
      tipo: 'Todos contra todos', puntaje_perdedor: 1, puntaje_ganador: 3, puntaje_empate: 2,
      organizador_id: 2
    })


    // FORMA 2 DE AGREGAR
    const torneo3 = await Torneo.create({ // id 3
      nombre: 'Torneo 3', fec_inicio: new Date(2021, 06, 17), fec_fin: new Date(2021, 06, 24),
      max_participantes: 6, descripcion: 'Torneo 2.', estado: 'activo', cant_particip_diarios: 4,
      tipo: 'Todos contra todos', puntaje_perdedor: 1, puntaje_ganador: 3, puntaje_empate: 2,
      organizador_id: 2
    });
    const equipo3 = await Equipo.create( // id 3
      {
        nombre: 'Equipo 3', lista_integrantes: ['I1', 'I2', 'I3', 'I4'],
          lider_id: 3
      })
    await torneo2.addEquipo(equipo2).catch(error => {
      console.log('error: ', error)
    })
    await equipo3.setTorneos([torneo2, torneo3]);
  } catch(err) {
    console.log(err);
  }
}
main();
