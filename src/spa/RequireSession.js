var RequireSession = {
  created: function () {
    var token = this.$cookie.get('gerenciador_igreja_token');
    console.log(token);
    if(!token){
      alert('Esta sessão está espirada.')
      this.$router.push({ path: '/login' })
    }
  },
  methods: {
    clearSession() {
      this.$cookie.delete('gerenciador_igreja_token')
      this.$router.push({ path: '/login' })
    }
  }
}

export default RequireSession
