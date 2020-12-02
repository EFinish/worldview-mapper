import Vue from 'vue';
import Vuex from 'vuex';

import {
  Statement, Premise, Argument, PremiseType,
} from '@/models';

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
          type: { label: 'IF p THEN q', numStatements: 2 } as PremiseType,
          statements: [
            { text: 'I have chocolate' } as Statement,
            { text: 'I will eat chocolate' } as Statement,
          ],
        } as Premise);
      context.commit('ADD_TO_PREMISE_STACK',
        {
          type: { label: 'p IS TRUE (assigns truth value)', numStatements: 1 } as PremiseType,
          statements: [
            { text: 'I have chocolate' } as Statement,
          ],
        } as Premise);
      context.commit('ADD_TO_ARGUMENT_STACK',
        {
          premises: [
            {
              id: 0,
              type: { label: 'IF p THEN q', numStatements: 2 } as PremiseType,
              statements: [
                { text: 'I have chocolate' } as Statement,
                { text: 'I will eat chocolate' } as Statement,
              ],
            } as Premise,
            {
              id: 1,
              type: { label: 'p IS TRUE (assigns truth value)', numStatements: 1 } as PremiseType,
              statements: [{ text: 'I have chocolate' } as Statement],
            } as Premise,
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
