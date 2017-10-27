<template lang="html">
  <div>
    <full-calendar :events="fcEvents" locale="pt"></full-calendar>
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


  export default {
    name: 'Calendar',
    data: function(){
      return {
        fcEvents: demoEvents
      }
    },
    components: {
    },
    computed: {
    },
    methods: {
    }
  }
</script>

<style>
</style>
