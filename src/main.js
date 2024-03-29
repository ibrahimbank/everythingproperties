import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/dist/vuetify.min.css";
import store from "./store/store";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(router).use(vuetify).use(store).mount("#app");
