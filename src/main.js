import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import i18n from './i18n';

Vue.config.productionTip = false

Vue.store = Vue.prototype.store = {
  projects: [
    {
      id: 'rts',
      title: 'RTS game',
      type: 'personnal',
      year: '2020',
      status: 'inprogress',
      links: 'https://github.com/pierre50/RTS-game',
      technologies: 'PixiJS',
      image_count: 1,
    },
    {
      id: 'supfile',
      title: 'Supfile',
      type: 'school',
      year: '2018',
      length: '6 mois',
      status: 'finished',
      links: 'https://github.com/pierre50/upload-frontend,https://github.com/pierre50/upload-backend',
      technologies: 'VueJS|ElementUI|Laravel',
      image_count: 5,
    },
    {
      id: 'awale',
      title: 'Awale',
      type: 'school',
      year: '2018',
      length: '2 semaines',
      status: 'finished',
      links: 'https://github.com/pierre50/awale',
      technologies: 'VueJS|ElementUi',
      image_count: 3,
    },
    {
      id: 'battleship',
      title: 'NodeJS Battleship',
      type: 'school',
      year: '2018',
      length: '2 semaines',
      status: 'finished',
      technologies: 'NodeJS|HTML|jQuery|Javascript|Bootstrap|SocketIO',
      image_count: 3
    },
    {
      id: 'weathermap',
      title: 'UWP WeatherMap',
      type: 'school',
      year: '2017',
      length: '1 semaines',
      status: 'finished',
      technologies: 'C#|Universal Windows App|GoogleMap API|OpenWeatherMap API',
      image_count: 3
    },
    {
      id: 'biblio',
      title: 'Angular Biblio',
      type: 'personnal',
      year: '2017',
      length: '1 semaines',
      status: 'finished',
      technologies: 'Angular2|HTML|Bootstrap|Javascript|jsPDF|Php',
      image_count: 2
    },
    {
      id: 'supinfy',
      title: 'Asp.net Streaming Music',
      type: 'school',
      year: '2017',
      length: '2 semaines',
      status: 'finished',
      technologies: 'Asp.net|C#|Jamendo API|Javascript|jQuery|Bootstrap',
      image_count: 3
    },
    {
      id: 'qwirk',
      title: 'NodeJS Chat App',
      type: 'school',
      year: '2017',
      length: '6 mois',
      status: 'finished',
      technologies: 'NodeJS|Javascript|jQuery|Bootstrap|HTML|WebRTC|SocketIO',
      image_count: 3
    },
    {
      id: 'imap',
      title: 'Swift Map',
      type: 'school',
      year: '2016',
      length: '2 semaines',
      status: 'finished',
      technologies: 'iOS|Qwirk|Core Data',
      image_count: 3
    },
    {
      id: 'supsale',
      title: 'Servlet Ad Website',
      type: 'school',
      year: '2016',
      length: '1 mois',
      status: 'finished',
      technologies: 'Java|Servlet|Javascript|jQuery|Bootstrap',
      image_count: 6
    },
    {
      id: 'symfony',
      title: 'Symfony Store Website',
      type: 'personnal',
      year: '2016',
      length: '2 semaines',
      status: 'finished',
      technologies: 'Symfony|PHP|HTML|Bootstrap|jQuery|Javascript',
      image_count: 6
    },
    {
      id: 'cakeblog',
      title: 'Cakephp Blog Website',
      type: 'personnal',
      year: '2015',
      length: '2 semaines',
      status: 'finished',
      technologies: 'CakePhp|PHP|HTML|Bootstrap',
      image_count: 2
    },
    {
      id: 'freefallin',
      title: 'Android 2D Game',
      type: 'personnal',
      year: '2015',
      length: '4 mois',
      status: 'aborted',
      technologies: 'GML|Google Game API|Facebook API',
      image_count: 4
    },
    {
      id: 'easyhome',
      title: 'Php Annonces immo',
      type: 'school',
      year: '2015',
      length: '3 mois',
      status: 'finished',
      technologies: 'PHP|HTML|Bootstrap',
      image_count: 1
    }
  ]
}

new Vue({
  vuetify,
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
