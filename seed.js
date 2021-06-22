// CORRER CON "" node seed ""

const { sequelize } = require('./src/models')
const models = require('./src/models')
const Equipo = models.Equipo
const Partida = models.Partida
const Ronda = models.Ronda
const Torneo = models.Torneo
const Usuario = models.Usuario

// USUARIOS
const usuarios = [
    // ADMIN id 1
    { nombre_completo: 'Pepe Gonzales', correo: 'ppelcrack@gmail.com', contraseña: 'ppelcrack', rol: 0 },
    // ORGANIZADOR (LO DEBERÍA PODER CREAR EL ADMIN) id 2
    { nombre_completo: 'Armando Barreras', correo: 'abarreras@gmail.com', contraseña: 'abarreras', rol: 1 },
    // LIDER id 3
    { nombre_completo: 'Jose Cardenas', correo: 'jcardenas@gmail.com', contraseña: 'jcaradenas', rol: 2 }
]

// TORNEOS
const torneos = [
    // id 1
    {
        nombre: 'Torneo ULima', fec_inicio: new Date(2021, 06, 18), fec_fin: new Date(2021, 06, 28),
        max_participantes: 6, descripcion: 'Torneo 1.', estado: 'activo', cant_particip_diarios: 4,
        tipo: 'Todos contra todos', puntaje_perdedor: 1, puntaje_ganador: 3, puntaje_empate: 2,
        organizador_id: 2
    }   
]
// EQUIPOS
const equipos = [
    // id 1
    {
        nombre: 'Los más capos de Progra Web', lista_integrantes: 'Jose, André, Juliana, Carlos, Willy',
        lider_id: 3
    }
]

// PARTIDAS

// RONDAS


// CREANDO REGISTROS
sequelize.sync({ force: false }).then(() => {
    // Conexión establecida
    console.log("Conexión establecida...");
}).then(() => {
    usuarios.forEach(usuario => Usuario.create(usuario));
}).then(() => {
    // Rellenar direcciones
    torneos.forEach(torneo => Torneo.create(torneo));
}).then(() => {
    // Rellenar posts
    equipos.forEach(equipo => Equipo.create(equipo));

}).then(() => {
    // RELACIÓN TORNEO-EQUIPO

    // FORMA 1 DE AGREGAR
    
    var equipo2 = Equipo.create( // id 2
    {
        nombre: 'Equipo 2', lista_integrantes: 'I1, I2, I3, I4',
        lider_id: 3
    })
    var torneo2 = Torneo.create({ // id 2
        nombre: 'Torneo 2', fec_inicio: new Date(2021, 06, 17), fec_fin: new Date(2021, 06, 24),
        max_participantes: 6, descripcion: 'Torneo 2.', estado: 'activo', cant_particip_diarios: 4,
        tipo: 'Todos contra todos', puntaje_perdedor: 1, puntaje_ganador: 3, puntaje_empate: 2,
        organizador_id: 2
    })
    

    // FORMA 2 DE AGREGAR
    var torneo3 = Torneo.create({ // id 3
        nombre: 'Torneo 3', fec_inicio: new Date(2021, 06, 17), fec_fin: new Date(2021, 06, 24),
        max_participantes: 6, descripcion: 'Torneo 2.', estado: 'activo', cant_particip_diarios: 4,
        tipo: 'Todos contra todos', puntaje_perdedor: 1, puntaje_ganador: 3, puntaje_empate: 2,
        organizador_id: 2
    })
    var equipo3 = Equipo.create( // id 3
    {
        nombre: 'Equipo 3', lista_integrantes: 'I1, I2, I3, I4',
        lider_id: 3
    })
}).then(() => {
    console.log(equipo2)
    torneo2.addEquipo(equipo2).catch(error => {
        console.log('error: ', error)
    })
    equipo3.setTorneo([torneo2, torneo3])
}).catch(error => {
    console.log('error: ', error)
})

