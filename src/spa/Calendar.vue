<template lang="html">
  <div class="calendar">
    <!-- <full-calendar :events="fcEvents" locale="pt" :config="config"></full-calendar> -->
    <div id="full-calendar"></div>
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
        }
      }
    },
    components: {
    },
    computed: {
      token(){
        return this.$cookie.get('gerenciador_igreja_token')
      },
    },
    methods: {
      eventSelected(){
        console.log("eventSelected");
      },
      loadEvents() {
        console.log(window);
        var payload = {
            token: this.token,
            periodo: ["01-01-1900 12:12:12", "01-01-2100 12:12:12"]
        }

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
                congregation: event.congregacoes,
                presents: event.presentes,
                address: event.endereco
              }
            });

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
               events: this.fcEvents
             });


          }, response => {
            console.log(response.body);
          });
      }
    },
    mounted(){
      this.loadEvents()
    },
  }
</script>

<style>
.calendar{
  height: 100%;
  min-height: 300px;
}
</style>
