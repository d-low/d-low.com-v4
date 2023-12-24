import './assets/styles/main.css';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import App from './App.vue';
import router from './router';

library.add(faEnvelope, faFacebook, faGithub, faLinkedin, faXTwitter);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app');
