<template lang="html">
  <div class="calendar">
    <!-- <full-calendar :events="fcEvents" locale="pt" :config="config"></full-calendar> -->
    <md-progress v-if="loading" md-indeterminate></md-progress>
    <div id="full-calendar"></div>
    <md-dialog md-open-from="#full-calendar" md-close-to="#full-calendar" ref="dialog">
      <md-dialog-title>{{ evt.title }}</md-dialog-title>

      <md-dialog-content>
          <span class="md-body-1">{{evt.content}}</span>
        </br></br>
          <div class="md-body-1">Tipo: {{evt.type}}</div>
          <div class="md-body-1">Inicia: {{evt.startTime}}</div>
          <div class="md-body-1">Termina: {{evt.endTime}}</div>
          <div class="md-body-1">Responsável: {{evt.reponsible}}</div>
          <div class="md-body-1">Congregação: {{evt.congregation}}</div>
          <div class="md-body-1">Endereço: {{evt.address}}</div>
          <div class="md-body-1">Quantidade de participantes: {{presents}}</div>

          <md-switch v-model="present" @click.native="!loading && sendPresent()" id="present" name="present" :disabled="loading">Estarei presente</md-switch>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('dialog')">Fechar</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  import moment from 'moment';
  var demoEvents = [
    {
        title : 'Culto',
        start : moment().subtract(20, 'days').add(i*7, 'days').format("YYYY-MM-DD"),
        end : moment().subtract(20, 'days').add(i*7, 'days').format("YYYY-MM-DD")
      },
  ]

  for(var i = 0; i < 10; i++){

    demoEvents.push({
        title : 'Culto',
        start : moment().subtract(20, 'days').add(i*7, 'days').format("YYYY-MM-DD"),
        end : moment().subtract(20, 'days').add(i*7, 'days').format("YYYY-MM-DD")
      },
      {
        title : 'Escola dominical',
        start : moment().subtract(20, 'days').add(i*7 + 3, 'days').format("YYYY-MM-DD"),
        end : moment().subtract(20, 'days').add(i*7 + 3, 'days').format("YYYY-MM-DD")
      },
      {
        title : 'Círculo de oração',
        start : moment().subtract(20, 'days').add(i*7 + 2, 'days').format("YYYY-MM-DD"),
        end : moment().subtract(20, 'days').add(i*7 + 2, 'days').format("YYYY-MM-DD")
      },
      {
        title : 'Evangelização',
        start : moment().subtract(20, 'days').add(i*7 + 5, 'days').format("YYYY-MM-DD"),
        end : moment().subtract(20, 'days').add(i*7 + 5, 'days').format("YYYY-MM-DD")
      }
    )
  }

  console.log(demoEvents);

  demoEvents = []
  import FullCalendar from 'vue-full-calendar'
  console.log(FullCalendar);


  export default {
    name: 'Calendar',
    components: {
      FullCalendar
    },
    data: function(){
      return {
        fcEvents: demoEvents,
        config: {
          selectable: true,
          editable: true
        },
        prompt: {
          title: "titulo",
          ok: "ok",
          value: ''
        },
        evt: {},
        loading: false,
        present: false
      }
    },
    components: {
    },
    computed: {
      token(){
        return this.$cookie.get('gerenciador_igreja_token')
      },
      presents(){
        return (this.evt.presents && this.evt.presents.length) || 0
      }
    },
    methods: {
      openDialog(ref) {
      this.$refs[ref].open();
      },
      closeDialog(ref) {
        this.$refs[ref].close();
      },
      eventSelected(){
        console.log("eventSelected");
      },
      sendPresent(){
        this.loading = true
        var payload = {
            token: this.token,
            id_evento: this.evt.id_evento
        }
        console.log(payload);

        if(this.present)
          this.$http.post(window.URL_API+"eventos/marcar_presenca", payload ).then(response => {
            // get body data
            this.loading = false
            this.evt.presents.push(this.token)
          }, response => {
            this.loading = false
            console.log(response.body);
          });
        else
          this.$http.post(window.URL_API+"eventos/cancelar_presenca", payload ).then(response => {
            // get body data
            this.loading = false

            this.evt.presents.splice(this.evt.presents.indexOf(this.token), 1)
          }, response => {
            this.loading = false
            console.log(response.body);
          });

      },
      loadEvents() {
        console.log(window);
        var payload = {
            token: this.token,
            periodo: ["01-01-1900 12:12:12", "01-01-2100 12:12:12"]
        }

        this.loading = true

        if(window.URL_API == undefined)
         setTimeout(this.loadEvents, 200)
        else
          this.$http.post(window.URL_API+"eventos/pesquisar", payload ).then(response => {
            // get body data

            this.fcEvents = response.body.map(function(event){
              return {
                title: event.nome,
                type: event.tipo,
                start: moment(event.data_inicio, 'DD-MM-YYYY HH:mm:ss').format("YYYY-MM-DD"),
                dateStart: moment(event.data_inicio, 'DD-MM-YYYY HH:mm:ss').format("YYYY-MM-DD HH:mm:ss"),
                end: moment(event.data_termino, 'DD-MM-YYYY HH:mm:ss').format("YYYY-MM-DD"),
                dateEnd: moment(event.data_termino, 'DD-MM-YYYY HH:mm:ss').format("YYYY-MM-DD HH:mm:ss"),
                reponsible: event.responsavel_pela_organizacao,
                content: event.resumo,
                congregation: event.congregacao_relacionada,
                presents: event.presentes,
                address: event.endereco,
                id_evento: event.id
              }
            });
            const self = this;
            $('#full-calendar').fullCalendar({
               header: {
                 left: 'prev,next today',
                 center: 'title',
                 right: 'month,agendaWeek,agendaDay,listWeek'
               },
               height: 'parent',
               defaultDate: moment().format('YYYY-MM-DD'),
               navLinks: true, // can click day/week names to navigate views
               editable: true,
               eventLimit: true, // allow "more" link when too many events
               events: this.fcEvents,
               eventClick: function(event){
                 self.evt = event
                 event.startTime = moment(event.dateStart, "YYYY-MM-DD HH:mm:ss").calendar()
                 event.endTime = moment(event.dateEnd, "YYYY-MM-DD HH:mm:ss").calendar()
                 self.present = event.presents.indexOf(self.token) > -1
                 console.log(event);
                 self.openDialog('dialog')
               }
             });

             this.loading = false

          }, response => {
            this.loading = false
            console.log(response.body);
          });
      }
    },
    mounted(){
      this.loadEvents()
    },
  }
</script>

<style lang="scss">
.calendar{
  height: 100%;
  min-height: 300px;

  .fc-title {
    color: white;
  }
}
</style>
