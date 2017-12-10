 <template>
   <div class="news-painel">
     <md-progress v-if="loading" md-indeterminate></md-progress>
     <md-card v-for="n in news" class="news" md-with-hover v-if="!addNewsView" @click.native="openNews(n)">
       <md-card-header>
         <div class="md-title">{{ n.title }}</div>
         <div class="md-subhead">{{n.responsible}} - {{ formateDate(n.date) }}</div>
       </md-card-header>

       <md-card-content>
         {{ n.content }}
       </md-card-content>
     </md-card>
     <div v-if="addNewsView">
       <md-input-container :class="getValidationClass('title')">
         <label for="title">Título</label>
         <md-input name="title" id="title" autocomplete="family-name" v-model="form.title" :disabled="loading" />
         <span class="md-error" v-if="!$v.form.title.required">O título é requerido</span>
         <span class="md-error" v-else-if="!$v.form.title.minlength">O título deve possuir no mínimo 3 caracteres</span>
       </md-input-container>

       <md-input-container :class="getValidationClass('content')">
         <label for="content">Contéudo</label>
         <md-textarea name="content" id="content" autocomplete="family-name" v-model="form.content" :disabled="loading"  maxlength="140"></md-textarea>
         <span class="md-error" v-if="!$v.form.content.required">O contéudo é requerido</span>
         <span class="md-error" v-else-if="!$v.form.content.minlength">O contéudo deve possuir no mínimo 10 caracteres</span>
       </md-input-container>

       <md-input-container :class="getValidationClass('type')">
         <label for="form.type">Tipo de evento</label>
         <md-select name="form.type" id="form.type" v-model="form.type">
           <md-option value="Avisos">Avisos</md-option>
           <md-option value="Versículo do dia">Versículo do dia</md-option>
           <md-option value="Chamada para eventos">Chamada para eventos</md-option>
         </md-select>
         <span class="md-error" v-if="!$v.form.type.required">O tipo é requerido</span>
       </md-input-container>

       <md-input-container :class="getValidationClass('congregation')">
         <label for="congregation">Congregação relacionada</label>
         <md-input name="congregation" id="congregation" autocomplete="family-name" v-model="form.congregation" :disabled="loading" />
         <span class="md-error" v-if="!$v.form.congregation.required">A congregação é requerida</span>
       </md-input-container>

       <md-input-container :class="getValidationClass('responsible')">
         <label for="responsible">Criador</label>
         <md-input name="responsible" id="responsible" autocomplete="family-name" v-model="form.responsible" :disabled="loading" />
         <span class="md-error" v-if="!$v.form.responsible.required">O criador é requerido</span>
       </md-input-container>

       <md-button class="add-news" @click.native="addEvent()">Adicionar Notícia</md-button>
     </div>

     <md-dialog md-open-from="#full-calendar" md-close-to="#full-calendar" ref="dialog">
       <md-dialog-title>{{ newsSelected.title }}</md-dialog-title>

       <md-dialog-content>
           <span class="md-body-1">{{newsSelected.content}}</span>
         </br></br>
           <div class="md-body-1"><b>Data:</b> {{formateDate(newsSelected.date)}}</div>
           <div class="md-body-1"><b>Tipo:</b> {{newsSelected.type}}</div>
           <div class="md-body-1"><b>Criador:</b> {{newsSelected.responsible}}</div>
           <div class="md-body-1"><b>Congregação:</b> {{newsSelected.congregation}}</div>
       </md-dialog-content>

       <md-dialog-actions>
         <md-button class="md-primary" @click.native="closeDialog('dialog')">Fechar</md-button>
       </md-dialog-actions>
     </md-dialog>
   </div>
 </template>

 <style lang="scss" scoped>
 .news-painel{
   height: 100%;

   .news {
     margin: 10px 0;
   }

   .add-news {
     float: right;
   }
 }
 </style>
 <script>
 var newsDemo = [
   {
     title: 'Visitante',
     content: 'O culto de hoje terá o Pastor Osvaldo como visitante.'
   },
   {
     title: 'Lembrete do evento X',
     content: 'As inscrições por evento X encerram dia 2, não deixe para a última hora, as vagas são limitadas.'
   },
   {
     title: 'Cantora vai participar do evento Y',
     content: 'Jô abençoada vai participar do evento Y.'
   },
   {
     title: 'Visitante',
     content: 'O culto de hoje terá o Pastor Osvaldo como visitante.'
   },
   {
     title: 'Lembrete do evento X',
     content: 'As inscrições por evento X encerram dia 2, não deixe para a última hora, as vagas são limitadas.'
   },
   {
     title: 'Cantora vai participar do evento Y',
     content: 'Jô abençoada vai participar do evento Y.'
   },
   {
     title: 'Visitante',
     content: 'O culto de hoje terá o Pastor Osvaldo como visitante.'
   },
   {
     title: 'Lembrete do evento X',
     content: 'As inscrições por evento X encerram dia 2, não deixe para a última hora, as vagas são limitadas.'
   },
   {
     title: 'Cantora vai participar do evento Y',
     content: 'Jô abençoada vai participar do evento Y.'
   },
 ]

 newsDemo = []

 import {
     required,
     email,
     minLength,
     maxLength
   } from 'vuelidate/lib/validators'

 export default{
   name: 'NewsPanel',
   props: {
     addNewsView: {
       default: false
     }
   },
   data: function(){
     return {
       news: [],
       loading: false,
       newsSelected: {},
       form: {
         title: null,
         type: null,
         date: null,
         responsible: null,
         content: null,
         congregation: null
       }
     };
   },
   computed: {
     token(){
       return this.$cookie.get('gerenciador_igreja_token')
     }
   },
   mounted(){
     this.loadNews()
   },
   validations: {
     form: {
       title: {
         required,
         minLength: minLength(3)
       },
       content: {
         required,
         minLength: minLength(10)
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
     }
   },
   methods: {
     openNews(n) {
      this.newsSelected = n;
      this.openDialog('dialog')
     },
     openDialog(ref) {
     this.$refs[ref].open();
     },
     closeDialog(ref) {
       this.$refs[ref].close();
     },
     formateDate(date){
       return moment(date, 'DD-MM-YYYY HH:mm:ss').calendar()
     },
     getValidationClass (fieldName) {
       const field = this.$v.form[fieldName]

       if (field) {
         return {
           'md-input-invalid': (field.$invalid && field.$dirty)
         }
       }
     },
     addEvent() {
       this.$v.$touch()
       if (!this.$v.$invalid) {
         this.loading = true
         var payload = {
             token: this.token,
             titulo: this.form.title,
             conteudo: this.form.content,
             tipo: this.form.type,
             congregacoes: this.form.congregation,
             criador: this.form.responsible,
             data: moment().format('DD-MM-YYYY HH:mm:ss'),
         }

         console.log(payload);
         this.$http.post(URL_API+"noticias", payload ).then(response => {
           // get body data
           console.log(response);
           this.news.push({
             title: payload.titulo,
             type: payload.tipo,
             date: payload.data,
             responsible: payload.criador,
             content: payload.conteudo,
             congregation: payload.congregacoes
           })
           this.loading = false
           this.$emit("news-added")

         }, response => {
           this.loading = false
           console.log(response.body);
         });
       }
     },
     loadNews(){
       console.log(window);
       this.loading = true
       var payload = {
           token: this.token,
       }

       if(window.URL_API == undefined)
        setTimeout(this.loadNews, 200)
       else
         this.$http.post(window.URL_API+"noticias/todas", payload ).then(response => {
           // get body data

           this.news = response.body.map(function(news){
             return {
               title: news.titulo,
               type: news.tipo,
               date: news.data,
               responsible: news.criador,
               content: news.conteudo,
               congregation: news.congregacoes
             }
           });
           this.news.sort(function(a, b){return moment(a.date, 'DD-MM-YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') < moment(b.date, 'DD-MM-YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')  })
           this.loading = false

         }, response => {
           this.loading = false
           console.log(response.body);
         });
     }
   }
 };
 </script>
