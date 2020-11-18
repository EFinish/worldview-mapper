import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    statementStack: [],
    propositionStack: [],
    argumentStack: [],
  },
  mutations: {
    ADD_TO_STATEMENT_STACK(state, payload) {
      state.statementStack.push(payload);
    },
    ADD_TO_PROPOSITION_STACK(state, payload) {
      state.propositionStack.push(payload);
    },
    ADD_TO_ARGUMENT_STACK(state, payload) {
      state.argumentStack.push(payload);
    },
  },
  actions: {
    addToStatementStack(context, newStatement) {
      context.commit('ADD_TO_STATEMENT_STACK', newStatement);
    },
    addToPropositionStack(context, newProposition) {
      context.commit('ADD_TO_PROPOSITION_STACK', newProposition);
    },
    addToArgumentStack(context, newArgument) {
      context.commit('ADD_TO_ARGUMENT_STACK', newArgument);
    },
  },
  getters: {
    getStatementStack(state) {
      return state.statementStack;
    },
    getPropositionStack(state) {
      return state.propositionStack;
    },
    getArgumentStack(state) {
      return state.argumentStack;
    },
  },
});
