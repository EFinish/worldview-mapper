import Vue from 'vue';
import Vuex from 'vuex';

import {
  Statement, Premise, Argument, PremiseType,
} from '@/models';
import constants from '@/utils/constants';

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
    initStoreForTesting(context) {
      context.commit('ADD_TO_STATEMENT_STACK', { text: 'I have chocolate' } as Statement);
      context.commit('ADD_TO_STATEMENT_STACK', { text: 'I will eat chocolate' } as Statement);
      context.commit('ADD_TO_PREMISE_STACK',
        {
          type: constants.PremiseTypes[2],
          statements: [
            context.getters.getStatementFromStackById(0),
            context.getters.getStatementFromStackById(1),
          ],
        } as Premise);
      context.commit('ADD_TO_PREMISE_STACK',
        {
          type: constants.PremiseTypes[0],
          statements: [
            context.getters.getStatementFromStackById(0),
          ],
        } as Premise);
      context.commit('ADD_TO_PREMISE_STACK',
        {
          type: constants.PremiseTypes[0],
          statements: [
            context.getters.getStatementFromStackById(1),
          ],
        } as Premise);
      context.commit('ADD_TO_ARGUMENT_STACK',
        {
          premises: [
            context.getters.getPremiseFromStackById(0),
            context.getters.getPremiseFromStackById(1),
          ],
          conclusion: context.getters.getPremiseFromStackById(2),
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
    // eslint-disable-next-line max-len
    getStatementFromStackById: (state) => (statementId: number) => state.statementStack.find((statement) => statement.id === statementId),
    // eslint-disable-next-line max-len
    getPremiseFromStackById: (state) => (premiseId: number) => state.premiseStack.find((premise) => premise.id === premiseId),
  },
});
