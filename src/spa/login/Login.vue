<template lang="html">
  <div class="Login__Wrapper">
    <md-card class="Login__CardWrappper">

      <md-card-content>
        <md-input-container :class="{'md-input-invalid': errors.has('email')}">
          <label>Usuário</label>
          <md-input type="email"
            name="email"
            v-model="user"
            v-validate
            data-vv-name="email"
            data-vv-rules="required|email"></md-input>
          <span class="md-error"></span>
        </md-input-container>

        <md-input-container>
          <label>Senha</label>
          <md-input type="password"
            v-model="password"></md-input>
        </md-input-container>

      </md-card-content>

      <md-card-actions>
        <!-- <md-button @click.stop="signup" >Criar conta</md-button> -->
        <md-button class="md-raised md-default"
          @click.stop="login">
          Entrar
        </md-button>
        <md-button class="md-raised md-primary"
          @click.stop="signup">
          Criar Conta
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        user: '',
        password: ''
      }
    },
    components: {
    },
    computed: {
      cnpjError() {
        // Exemplo de computed properties
        return (this.errors) ? this.errors.first('cnpj') : ''
      },
      emailError() {
        // Exemplo de computed properties
        return (this.errors) ? this.errors.first('email') : ''
      }
    },
    methods: {
      login() {
        this.$cookie.set('gerenciador_igreja_token', "be474af4-c398-4184-9559-0c65ce68db65dcafc348-0b92-4c3f-993c-bab98075a63b", 1);
        this.$router.push({ path: '/main' })

        var payload = {
          senha: this.password,
          email: this.user
        }

        this.$http.post(URL_API+"usuarios/token", payload ).then(response => {

          // get body data
          //this.someData = response.body;
          console.log(response);
          this.$cookie.set('gerenciador_igreja_token', response.body.token, 1);
          this.$router.push({ path: '/main' })

        }, response => {
          console.log(response.body);
        });
      },
      signup() {
        this.$router.push({ path: '/signup' })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .Login__Wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .Login__CardWrappper {
    margin-top: 20vh;
    min-width: 400px;
    width: 22%;
  }

  .Login__CardImage {
    display: flex;
    justify-content: center;
    img {
      max-width: 200px;
    }
  }
</style>
