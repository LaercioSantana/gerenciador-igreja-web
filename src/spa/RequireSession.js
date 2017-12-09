var RequireSession = {
  created: function () {
    var token = this.$cookie.get('gerenciador_igreja_token');
    var admin = this.$cookie.get('gerenciador_igreja_admin');
    console.log(token, admin);
    if(!token){
      alert('Esta sessão está espirada.')
      this.$router.push({ path: '/login' })
    }
  },
  computed: {
    isAdmin() {
      return this.$cookie.get('gerenciador_igreja_admin') == "true"
    }
  },
  methods: {
    clearSession() {
      this.$cookie.delete('gerenciador_igreja_token')
      this.$cookie.delete('gerenciador_igreja_admin')
      this.$router.push({ path: '/login' })
    },
    needAdmin() {
      if(!this.isAdmin){
        alert('Você precisa ser um administrador para acessar essa página.')
        this.$router.push({ path: '/main' })
      }
    }
  }
}

export default RequireSession
