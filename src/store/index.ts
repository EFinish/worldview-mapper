import Vue from 'vue';
import Vuex from 'vuex';

import { Statement, Premise, Argument } from '@/models';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    statementStack: [] as Statement[],
    premiseStack: [] as Premise[],
    argumentStack: [] as Argument[],
  },
  mutations: {
    ADD_TO_STATEMENT_STACK(state, payload: Statement) {
      state.statementStack.push(payload);
    },
    ADD_TO_PREMISE_STACK(state, payload: Premise) {
      state.premiseStack.push(payload);
    },
    ADD_TO_ARGUMENT_STACK(state, payload: Argument) {
      state.argumentStack.push(payload);
    },
  },
  actions: {
    addToStatementStack(context, newStatement: Statement) {
      context.commit('ADD_TO_STATEMENT_STACK', newStatement);
    },
    addToPremiseStack(context, newPremise: Premise) {
      context.commit('ADD_TO_PREMISE_STACK', newPremise);
    },
    addToArgumentStack(context, newArgument: Argument) {
      context.commit('ADD_TO_ARGUMENT_STACK', newArgument);
    },
    initStoreForTesting(context) {
      context.commit('ADD_TO_STATEMENT_STACK', { text: 'I have chocolate' } as Statement);
      context.commit('ADD_TO_STATEMENT_STACK', { text: 'I will eat chocolate' } as Statement);
      context.commit('ADD_TO_PREMISE_STACK',
        {
          type: { label: 'IF p THEN q', numStatements: 2 },
          statements: [
            { text: 'I have chocolate' },
            { text: 'I will eat chocolate' },
          ],
        });
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
