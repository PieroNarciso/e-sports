
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
                <a href="#" class="rounded-lg border-1 border-black w-16 h-8 block text-center pt-1">Fixture</a>
                <router-link v-bind:to="'/posiciones/?id='+torneo.id" id="botona" class="rounded-lg border-1 border-black w-16 h-8 block text-center pt-1">Ver</router-link> 
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
const Posiciones={
  template:/*html*/ `
    <div class="flex items-center justify-center">
    <div class="bg-white p-10 rounded-lg w-2/3 ">
        <div class="grid items-center justify-center">
        <table class="table-fixed bg-blue-400 border-4 border-opacity-100 border-indigo-300"> 
            <thead class="bg-blue-400 border-4 border-opacity-100 border-indigo-300"> 
            <tr>
                        <th class="w-1/4 bg-blue-400 border-4 border-opacity-100 border-indigo-300">Equipos</th>
                        <template v-for="equipo in lequipo"> 
                        <th class="border-4 border-opacity-100 border-indigo-300">{{equipo.nombre}}</th> 
                        </template>
                        <th> Total de Puntos </th>
                    
                </tr>
            </thead>
            <tbody class="bg-blue-600">
            <template v-for="equipo in lequipo">
                    <tr class="flex-row justify-items-center mt-3 border-4 border-opacity-100 border-indigo-300">
                    <td class="w-1/4 border-4 border-opacity-100 border-indigo-300" >{{"  "}}{{equipo.nombre}}</td>
                    <template v-for="equipo2 in lequipo">
                      <template v-if="equipo.nombre == equipo2.nombre">
                            <td class="border-4 border-opacity-100 border-indigo-300"> [------]  </td>
                      </template>
                      <template v-else>
                                <td class="border-4 border-opacity-100 border-indigo-300">{{puntaje= buscarpartida(equipo.nombre,equipo2.nombre)}}</td>
                      </template>     
                    </template>
                    <td class="border-4 border-opacity-100 border-indigo-300">{{contador}}</td>
                    </tr>
                    {{resetearcontador()}}
            </template>
            </tbody>
        </table>
        </div>
        </div>
    </div>
</div>
  `,data()
    {return{
      torneo: [],
      lequipo:[],
      num:64,
      contador:0,
      puntaje:0,
      resultado:0
      }
    },
  mounted()
  {
      console.log(this.$route.query.id)
      fetch('/user/api/posiciones/'+this.$route.query.id)
      .then(rpta=> rpta.json())
      .then(rpta =>{
        console.log(rpta.equipos)
        this.lequipo = rpta.equipos
        this.torneo = rpta.torneo 
      }).catch(erro =>{
        console.log(erro)
      })
  },
  methods:{
    buscarpartida(nombre1,nombre2){  
      let resultado    
      this.torneo.rondas.forEach( ronda => {
            ronda.partidas.forEach(partida =>{ 
                  if(partida.equipo_B == nombre1 && partida.equipo_A == nombre2) {
                          resultado= partida.resultado_A 
                  }else{                 
                          resultado= partida.resultado_B
                  }

                 })  
         })
         return resultado

    },
    resetearcontador(){
      this.contador = 0
    },
    aumentarcontador(nombre1,nombre2){
      let puntuacion = this.buscarpartida(nombre1,nombre2)
      this.contador += puntuacion
    }

  },

}
const Rondas = {
  template: `Rondas`
}

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/torneos', component: Torneo },
    { path: '/rondas', component: Rondas },
    {path: '/posiciones', component: Posiciones}
  ]
})

app.use(router).mount('#app');
