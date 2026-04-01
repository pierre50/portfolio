import { createApp } from "vue";
import "./assets/variables.css";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";
import { vReveal } from "./directives/reveal";

const app = createApp(App);
app.use(router).use(i18n).use(vuetify);
app.directive("reveal", vReveal);
app.mount("#app");
