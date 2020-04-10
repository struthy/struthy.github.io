import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store/store";
import VuePaginate from "vue-paginate";

Vue.use(VuePaginate);

Vue.config.productionTip = false;

new Vue({ store, router, render: h => h(App) }).$mount("#app");
