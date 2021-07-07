const app = Vue.createApp({});

const Home = {
  template: /* html */`
    <div v-if="torneos.length > 0" class="mt-8 w-full grid grid-cols-1 justify-items-center">
      <div v-for="torneo in torneos" class="mt-4 pb-4 border-b-2 border-gray-300 w-11/12 grid grid-cols-4">
        <div class="flex items-center col-span-3">
          <div class="w-4 h-4 rounded-full bg-yellow-500 mx-4"> </div>
          <p>{{torneo.nombre}}</p>
        </div>
        <!-- boton -->
        <div class="col-span-1 row-span-3 self-center">
          <a href="#" class="rounded-lg border-1 border-black w-16 h-8 block text-center pt-1">Ver</a>
        </div>
        <div class="px-4 w-full h-auto col-span-3">
          <p>{{torneo.descripcion}}</p>
        </div>
        <div class="px-4 w-full h-auto flex col-span-3">
          <p>Equipos registrados: </p>
          <p v-for="elem in inscritos" >
            <p class="pl-1" v-if="elem.id == torneo.id">{{elem.activos}}</p>
          </p>
          <p>/{{torneo.max_participantes}}</p>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      torneos: [],
      inscritos: []
    }
  },
  mounted() {
    fetch('/torneos/?spa=true').then(res => res.json())
      .then((data) => {
        this.torneos = data.torneos
        this.inscritos = data.inscritos
      })
      .catch(err => console.log(err.message))
  },
  methods: {
  }
}

const Torneo = {
  template: `
    <div>Torneos</div>
  `,
  data() {
    return {
      torneos: [],
    }
  },
  methods: {
    fetchTorneos() {
      console.log('Hola');
    }
  }
}

const Rondas = {
  template: `Rondas`
}

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/torneos', component: Torneo },
    { path: '/rondas', component: Rondas }
  ]
})

app.use(router).mount('#app');
