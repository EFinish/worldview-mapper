import Vue from 'vue';
import Vuex from 'vuex';

import {
  Statement, Premise, Argument,
} from '@/models';
import initStoreForTesting from '@/store/init';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    statementStack: [] as Statement[],
    premiseStack: [] as Premise[],
    argumentStack: [] as Argument[],
  },
  mutations: {
    ADD_TO_STATEMENT_STACK(state, payload: Statement) {
      state.statementStack.push(
        {
          id: state.statementStack.length,
          ...payload,
        } as Statement,
      );
    },
    ADD_TO_PREMISE_STACK(state, payload: Premise) {
      state.premiseStack.push({
        id: state.premiseStack.length,
        ...payload,
      } as Premise);
    },
    ADD_TO_ARGUMENT_STACK(state, payload: Argument) {
      state.argumentStack.push({
        id: state.argumentStack.length,
        ...payload,
      });
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
    initStore(context) {
      initStoreForTesting(context);
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
    // eslint-disable-next-line max-len
    getStatementFromStackById: (state) => (statementId: number) => state.statementStack.find((statement) => statement.id === statementId),
    // eslint-disable-next-line max-len
    getPremiseFromStackById: (state) => (premiseId: number) => state.premiseStack.find((premise) => premise.id === premiseId),
  },
});
