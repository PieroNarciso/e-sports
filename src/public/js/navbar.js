const app = Vue.createApp({
  data() {
    return {
      drawerShow: false,
    }
  },
  methods: {
    toggleDrawer() {
      this.drawerShow = !this.drawerShow
    }
  }
});

app.mount('#navbar-app');
