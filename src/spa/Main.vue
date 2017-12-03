<template lang="html">
  <div class="phone-viewport">
    <md-toolbar>
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title">Gerenciador de Igreja</h2>

      <md-button class="md-icon-button" @click="exit">
        <md-icon>clear</md-icon>
      </md-button>
    </md-toolbar>

    <md-layout md-gutter class="container" :style="{ height: viewHeight + 'px' }">
      <md-layout class="main-container">
        <md-card>
          <md-card-header>
            <md-button @click.native="calendar" v-if="isAddEvent()"><md-icon>arrow_back</md-icon></md-button> <div class="md-title" v-else>Calendário de eventos</div>
          </md-card-header>

          <md-card-content>
            <router-view></router-view>
          </md-card-content>

          <md-card-actions>
            <md-button @click.native="addEvent()" >Adicionar Evento</md-button>
          </md-card-actions>
        </md-card>
      </md-layout>
      <md-layout class="news-container">
        <md-card>
          <md-card-header>
            <div class="md-title">Calendário de eventos</div>
          </md-card-header>

          <md-card-content class="news-card-content">
            <news-panel></news-panel>
          </md-card-content>
        </md-card>
      </md-layout>
    </md-layout>

    <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">

      <md-list>
        <md-list-item>
            <router-link to="/main/calendar" @click.native="closeLeftSidenav()">Home</router-link>
        </md-list-item>
        <md-list-item>
            <router-link to="/main/calendar" @click.native="closeLeftSidenav()">Financeiro</router-link>
        </md-list-item>
        <md-list-item>
            <router-link to="/main/calendar" @click.native="closeLeftSidenav()">Informação Membros</router-link>
        </md-list-item>
        <md-list-item>
            <router-link to="/main/calendar" @click.native="closeLeftSidenav()">Informações Cadastrais</router-link>
        </md-list-item>
        <md-list-item>
            <router-link to="/main/calendar" @click.native="closeLeftSidenav()">Notícias</router-link>
        </md-list-item>
      </md-list>
    </md-sidenav>
  </div>
</template>

<script type="text/javascript">
  import NewsPanel from '../shared-components/NewsPanel'
  import RequireSession from './RequireSession'

  export default {
    mixins: [RequireSession],
    data() {
      return {}
    },
    components: {
      NewsPanel
    },
    computed: {
      viewHeight: function(){
        return window.innerHeight - 100;
      },
    },
    methods: {
      isAddEvent() {
        return this.$router.currentRoute.fullPath.indexOf('add-event') > -1
      },
      toggleLeftSidenav() {
        this.$refs.leftSidenav.toggle();
      },
      toggleRightSidenav() {
        this.$refs.rightSidenav.toggle();
      },
      closeRightSidenav() {
        this.$refs.rightSidenav.close();
      },
      closeLeftSidenav() {
        this.$refs.leftSidenav.close();
      },
      addEvent() {
        this.$router.push({ path: '/main/add-event' })
      },
      calendar() {
        this.$router.push({ path: '/main/calendar' })
      },
      open(ref) {
        console.log('Opened: ' + ref);
      },
      close(ref) {
        console.log('Closed: ' + ref);
      },
      addEventButtonClass(){
        return {
          hidden: this.$router.currentRoute.fullPath.indexOf('add-event') > -1
        }
      },
      exit(){
        this.clearSession();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    padding: 10px;

    .main-container {
      flex: 10 0 700px;
      padding-right: 10px;

      &> div {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      .md-card-content{
        height: 100%;
      }
    }
    .news-container{
      flex: 1 0 300px;

      .news-card-content {
        overflow-y: auto;
      }

      &> div {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    }
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    -webkit-border-radius: 2px;
    background-color:rgba(0, 0, 0, 0.08);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 2px;
    border-radius: 2px;
    background: rgba(0, 0, 0, 0.33);
  }

  .hidden {
    display: none;
  }

  .md-toolbar {
    .md-title {
      flex: 1 0 auto;
    }
  }
</style>
