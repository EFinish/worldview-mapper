import Vue from 'vue';
import Vuex from 'vuex';

import { Statement } from '@/models';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    statementStack: [],
    premiseStack: [],
    argumentStack: [],
  },
  mutations: {
    ADD_TO_STATEMENT_STACK(state, payload: Statement) {
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
    addToStatementStack(context, newStatement: Statement) {
      context.commit('ADD_TO_STATEMENT_STACK', newStatement);
    },
    addToPremiseStack(context, newPremise) {
      context.commit('ADD_TO_PROPOSITION_STACK', newPremise);
    },
    addToArgumentStack(context, newArgument) {
      context.commit('ADD_TO_ARGUMENT_STACK', newArgument);
    },
    initStoreForTesting(context) {
      context.commit('ADD_TO_STATEMENT_STACK', { text: 'I have chocolate' } as Statement);
      context.commit('ADD_TO_STATEMENT_STACK', { text: 'I will eat chocolate' } as Statement);
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
