<template>
  <div class="add-event">
    <form>
      <md-progress v-if="sending" md-indeterminate></md-progress>
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

      <md-input-container :class="getValidationClass('type')">
        <label for="form.type">Tipo de evento</label>
        <md-select name="form.type" id="form.type" v-model="form.type">
          <md-option value="Culto">Culto</md-option>
          <md-option value="Escola dominical">Escola dominica</md-option>
          <md-option value="Ensaio de departamento">Ensaio de departamento</md-option>
          <md-option value="Conjunto de oração">Conjunto de oração</md-option>
          <md-option value="Batismo">Batismo</md-option>
          <md-option value="Beneficente">Beneficente</md-option>
          <md-option value="Congresso">Congresso</md-option>
          <md-option value="Genérico">Genérico</md-option>
        </md-select>
        <span class="md-error" v-if="!$v.form.type.required">O tipo é requerido</span>
      </md-input-container>

      <md-input-container :class="getValidationClass('address')">
        <label for="address">Endereço</label>
        <md-input name="address" id="address" autocomplete="family-name" v-model="form.address" :disabled="sending" />
        <span class="md-error" v-if="!$v.form.address.required">O endereço é requerido</span>
        <span class="md-error" v-else-if="!$v.form.address.minlength">O endereço deve possuir no mínimo 3 caracteres</span>
      </md-input-container>

      <div class="row">
        <date-picker :date="form.dateStart" :option="optionDatePickerStart" :limit="limitDatePicker"></date-picker>
      </div>
      <div class="row">
        <date-picker :date="form.dateEnd" :option="optionDatePickerEnd" :limit="limitDatePicker"></date-picker>
      </div>
      <span class="md-error" v-if="dateInvalid">A data do fim deve ser maior que a do início</span>
      <span class="md-error" v-if="tryAddEvent && (!$v.form.dateStart.time.required || !$v.form.dateEnd.time.required)">A datas são requeridas</span>

      <md-input-container :class="getValidationClass('congregation')">
        <label for="congregation">Congregação relacionada</label>
        <md-input name="congregation" id="congregation" autocomplete="family-name" v-model="form.congregation" :disabled="sending" />
        <span class="md-error" v-if="!$v.form.congregation.required">A congregação é requerida</span>
      </md-input-container>

      <md-input-container :class="getValidationClass('responsible')">
        <label for="responsible">Responsável pela organização</label>
        <md-input name="responsible" id="responsible" autocomplete="family-name" v-model="form.responsible" :disabled="sending" />
        <span class="md-error" v-if="!$v.form.responsible.required">O responsável é requerido</span>
      </md-input-container>

      <md-button class="add-event" @click.native="addEvent()">Adicionar Evento</md-button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.add-event{
  .row {
    margin-top: 7px;
  }

  .md-error {
    color: red;
  }

  .add-event {
    float: right;
  }
}
</style>

<script>

import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'

import myDatepicker from 'vue-datepicker'
import moment from 'moment';
window.moment = moment

import RequireSession from './RequireSession'

export default{
  name: 'AddEvent',
  components: {
    'date-picker': myDatepicker
  },
  mixins: [RequireSession],
  data: function(){
    return {
      form: {
        name: null,
        resume: null,
        type: null,
        address: null,
        congregation: null,
        responsible: null,
        dateStart: {
          time: null
        },
        dateEnd: {
          time: null
        }
      },
      sending: false,
      tryAddEvent: false,
      limitDatePicker: [],
      optionDatePickerStart: {
        type: 'min',
        week: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
        month: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        format: 'YYYY-MM-DD HH:mm',
        placeholder: 'Data de Início',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '22px',
          'font-size': '16px',
          'border': '2px solid #fff',
          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          'border-radius': '2px',
          'color': '#5F5F5F'
        },
        color: {
          header: '#ccc',
          headerText: '#f00'
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      },
      optionDatePickerEnd: {
        type: 'min',
        week: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
        month: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        format: 'YYYY-MM-DD HH:mm',
        placeholder: 'Data de Fim',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '22px',
          'font-size': '16px',
          'border': '2px solid #fff',
          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          'border-radius': '2px',
          'color': '#5F5F5F'
        },
        color: {
          header: '#ccc',
          headerText: '#f00'
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      }
    };
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      },
      address: {
        required,
        minLength: minLength(3)
      },
      congregation: {
        required,
      },
      responsible: {
        required,
      },
      type: {
        required,
      },
      resume: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(150)
      },
      dateStart: {
        time: {required}
      },
      dateEnd: {
        time: {required}
      }
    }
  },
  computed: {
    token(){
      return this.$cookie.get('gerenciador_igreja_token')
    },
    dateInvalid(){
      if(this.form.dateStart.time == '' || this.form.dateEnd.time == '' )
        return false
      return this.form.dateStart.time > this.form.dateEnd.time
    }
  },
  created(){
    this.needAdmin()
  },
  watch: {
    'form.dateStart.time': function(){
      console.log(this.form.dateStart.time);
    },
    'form.dateEnd.time': function(){
      console.log(this.form.dateEnd.time);
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
    addEvent() {
      this.tryAddEvent = true
      this.$v.$touch()
      if (!this.$v.$invalid && !this.dateInvalid) {
        this.sending = true
        var payload = {
            token: this.token,
            nome: this.form.name,
            resumo: this.form.resume,
            tipo: this.form.type,
            endereco: this.form.address,
            congregacao_relacionada: this.form.congregation,
            responsavel_pela_organizacao: this.form.responsible,
            data_inicio: moment(this.form.dateStart.time).format('DD-MM-YYYY HH:mm:ss'),
            data_termino: moment(this.form.dateEnd.time).format('DD-MM-YYYY HH:mm:ss')
        }

        console.log(payload);
        this.$http.post(URL_API+"eventos", payload ).then(response => {
          // get body data
          this.someData = response.body;
          console.log(response);
          this.sending = false
          this.$router.push({ path: '/main' })

        }, response => {
          this.sending = false
          console.log(response.body);
        });
      }
    }
  }
};
</script>
