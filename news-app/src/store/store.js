import Vue from "vue";
import Vuex from "vuex";
import { newsService } from "@/services/newsService";

Vue.use(Vuex);

Array.prototype.unique = function() {
  return this.filter(function(value, index, self) {
    return self.indexOf(value) === index;
  });
};

export default new Vuex.Store({
  state: {
    articles: [],
    selectedType: "All"
  },
  mutations: {
    addArticles(state, data) {
      state.articles = [...data];
    },
    changeSelectedType(state, data) {
      state.selectedType = data;
    }
  },
  getters: {
    articleTypes: state => {
      if (!state.articles) return;

      return state.articles
        .map(function(x) {
          return x.Type;
        })
        .unique();
    },
    filteredItems: state => {
      return state.articles.filter(x => {
        return state.selectedType === "All" || x.Type === state.selectedType;
      });
    }
  },
  actions: {
    async getNewsArticles(context) {
      if (context.state.articles && context.state.articles.length > 0) return;

      let results = await newsService();

      context.commit("addArticles", results);
    }
  }
});
