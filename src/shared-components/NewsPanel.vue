 <template>
   <div class="news-painel">
     <md-card v-for="n in news" class="news" md-with-hover>
       <md-card-header>
         <div class="md-title">{{ n.title }}</div>
       </md-card-header>

       <md-card-content>
         {{ n.content }}
       </md-card-content>
     </md-card>
   </div>
 </template>

 <style lang="scss" scoped>
 .news-painel{
   height: 100%;

   .news {
     margin: 10px 0;
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

 export default{
   name: 'NewsPanel',
   data: function(){
     return {
       news: []
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
   methods: {
     loadNews(){
       console.log(window);
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
               reponsible: news.criador,
               content: news.conteudo,
               congregation: news.congregacoes
             }
           });


         }, response => {
           console.log(response.body);
         });
     }
   }
 };
 </script>
