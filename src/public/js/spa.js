const app = Vue.createApp({});

const Home = {
  template: `
    <div>Home</div>
    {{ text }}
  `,
  data() {
    return {
      text: 'Hello World',
    }
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
  },
  beforeMount() {
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
