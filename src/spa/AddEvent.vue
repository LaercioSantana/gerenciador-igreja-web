<template>
  <div class="add-event">
    <form>
      <md-input-container :class="getValidationClass('name')">
        <label for="name">Nome</label>
        <md-input name="name" id="name" autocomplete="family-name" v-model="form.name" :disabled="sending" />
        <span class="md-error" v-if="!$v.form.name.required">O nome é requerido</span>
        <span class="md-error" v-else-if="!$v.form.name.minlength">O nome deve possuir no mínimo 3 caracteres</span>
      </md-input-container>

      <md-input-container :class="getValidationClass('resume')">
        <label for="resume">Resumo</label>
        <md-textarea name="resume" id="resume" autocomplete="family-name" v-model="form.resume" :disabled="sending"  maxlength="140"></md-textarea>
        <span class="md-error" v-if="!$v.form.resume.required">O Resumo é requerido</span>
        <span class="md-error" v-else-if="!$v.form.resume.minlength">O resumo deve possuir no mínimo 10 caracteres</span>
      </md-input-container>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.add-event{

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
  name: 'AddEvent',
  data: function(){
    return {
      form: {
        name: null,
        resume: null,
        type: null,
        address: null,
        congregation: null,
        responsible: null
      },
      sending: false
    };
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      },
      resume: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(150)
      },
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-input-invalid': field.$invalid && field.$dirty
        }
      }
    },
    validateUser () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          var payload = {
            nome: this.name,
            //email: this.email
          }

          // this.$http.post(URL_API+"eventos", payload ).then(response => {
          //
          //   // get body data
          //   this.someData = response.body;
          //   console.log(response);
          //
          // }, response => {
          //   console.log(response.body);
          // });
        }
    }
  }
};
</script>
