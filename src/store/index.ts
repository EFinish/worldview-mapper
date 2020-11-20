import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    statementStack: [
      'I have chocolate',
      'I will eat chocolate',
    ],
    premiseStack: [],
    argumentStack: [],
  },
  mutations: {
    ADD_TO_STATEMENT_STACK(state, payload) {
      state.statementStack.push(payload);
    },
    ADD_TO_PROPOSITION_STACK(state, payload) {
      state.premiseStack.push(payload);
    },
    ADD_TO_ARGUMENT_STACK(state, payload) {
      state.argumentStack.push(payload);
    },
  },
  actions: {
    addToStatementStack(context, newStatement) {
      context.commit('ADD_TO_STATEMENT_STACK', newStatement);
    },
    addToPremiseStack(context, newPremise) {
      context.commit('ADD_TO_PROPOSITION_STACK', newPremise);
    },
    addToArgumentStack(context, newArgument) {
      context.commit('ADD_TO_ARGUMENT_STACK', newArgument);
    },
  },
  getters: {
    getStatementStack(state) {
      return state.statementStack;
    },
    getPremiseStack(state) {
      return state.premiseStack;
    },
    getArgumentStack(state) {
      return state.argumentStack;
    },
  },
});
