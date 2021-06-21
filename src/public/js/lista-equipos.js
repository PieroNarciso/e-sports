const listaEquipo = Vue.createApp({
  data() {
    return {
      equipos: [
        {
          nombre: 'Leon',
          activo: true,
          integrantes: ['Integrante1', 'Integrante2'],
          showIntegrantes: false,
        },
        {
          nombre: 'Cobra',
          activo: false,
          integrantes: ['Integrante 1', 'Integrante 2'],
          showIntegrantes: false,
        },
      ],
    }
  },
});

listaEquipo.mount('#lista-equipo');
