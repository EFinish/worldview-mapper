import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    statementStack: [],
  },
  mutations: {
    ADD_TO_STATEMENT_STACK(state, payload) {
      state.statementStack.push(payload);
    },
  },
  actions: {
    addToStatementStack(context, newStatement) {
      context.commit('ADD_TO_STATEMENT_STACK', newStatement);
    },
  },
  getters: {
    getStatementStack(state) {
      return state.statementStack;
    },
  },
});
