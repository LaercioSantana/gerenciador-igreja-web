<template>
  <div class="signup">
    <form novalidate class="md-layout-row md-gutter" @submit.prevent="validateUser">
      <md-progress v-if="sending" md-indeterminate></md-progress>
      <md-card class="md-flex-50 md-flex-small-100">
        <md-card-header>
        </md-card-header>

        <md-card-content>
          <md-layout class="md-layout-row md-gutter md-flex md-layout-wrap">
            <md-layout class="md-flex md-flex-small-100">
              <md-input-container :class="getValidationClass('firstName')">
                <label for="first-name">Nome</label>
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.firstName.required">O primeiro nome é requerido</span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">O primeiro nome deve possuir no mínimo 3 caracteres</span>
              </md-input-container>
            </md-layout>

            <md-layout class="md-flex md-flex-small-100">
              <md-input-container :class="getValidationClass('lastName')">
                <label for="last-name">Sobrenome</label>
                <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.lastName.required">O sobrenome é requerido</span>
                <span class="md-error" v-else-if="!$v.form.lastName.minlength">O sobrenome deve possuir no mínimo 3 caracteres</span>
              </md-input-container>
            </md-layout>
          </md-layout>

          <md-layout class="md-layout-row md-gutter md-flex md-layout-wrap">
            <md-layout class="md-flex md-flex-small-100">
              <md-input-container :class="getValidationClass('gender')">
                <label for="gender">Sexo</label>
                <md-select name="gender" id="gender" v-model="form.gender" md-dense :disabled="sending">
                  <md-option></md-option>
                  <md-option value="M">M</md-option>
                  <md-option value="F">F</md-option>
                </md-select>
                <span class="md-error">O sexo é requerido</span>
              </md-input-container>
            </md-layout>

            <md-layout class="md-flex md-gutter md-flex-small-100">
              <md-input-container :class="getValidationClass('age')">
                <label for="age">Idade</label>
                <md-input type="number" id="age" name="age" autocomplete="age" v-model="form.age" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.age.required">A idade é requerida</span>
                <span class="md-error" v-else-if="!$v.form.age.maxlength">Idade inválida</span>
              </md-input-container>
            </md-layout>
          </md-layout>

          <md-input-container :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.email.required">O email é requerido</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Email inválido</span>
            <span class="md-error" v-if="userConflict">Usuário já cadastrado</span>
          </md-input-container>

          <md-input-container :class="getValidationClass('password')">
            <label for="password">Senha</label>
            <md-input type="password" name="password" id="password" autocomplete="password" v-model="form.password" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.password.required">A senha é requerida</span>
            <span class="md-error" v-else-if="!$v.form.password.email">Senha deve possui no mínimo 6 caracteres</span>
          </md-input-container>
        </md-card-content>


        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Criar conta</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  .signup {
    .md-card {
      margin: 2em auto;
      padding: 1em;
      max-width: 400px;
    }
  }
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>

<script>

import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'

export default{
  name: 'Signup',
  data: function(){
    return {
      form: {
        firstName: null,
        lastName: null,
        gender: null,
        age: null,
        email: null,
        senha: null
      },
      userConflict: false,
      sending: false,
      lastUser: null
    };
  },
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      age: {
        required,
        maxLength: maxLength(3)
      },
      gender: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if(fieldName == 'email'){
        var force = this.userConflict
      }

      if (field) {
        return {
          'md-input-invalid': force || (field.$invalid && field.$dirty)
        }
      }
    },
    validateUser () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          var payload = {
            senha: this.form.password,
            email: this.form.email
          };
          this.sending = true

          this.$http.post(URL_API+"usuarios", payload ).then(response => {

            this.$cookie.set('gerenciador_igreja_token', response.body.token, 1)
            this.sending = false
            this.$router.push({ path: '/main' })

          }, response => {
            this.sending = false
            console.log(response.body);
            console.log(this.userConflict);
            this.userConflict = true
          });
        }
      }
  }
 };
</script>
