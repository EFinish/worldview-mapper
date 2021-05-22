import Argument from '@/models/Argument';
import { Premise } from '@/models/interfaces/Premise';
import { PropositionType } from '@/models/interfaces/PropositionType';
import Statement from '@/models/Statement';
import TruthStatement from '@/models/TruthStatement';
import Vue from 'vue';
import Vuex from 'vuex';

import initStoreForTesting from '@/store/init';
import Proposition from '@/models/Proposition';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    statementStack: [] as Statement[],
    premiseStack: [] as Premise[],
    argumentStack: [] as Argument[],
  },
  mutations: {
    ADD_TO_STATEMENT_STACK(state, args: { text: string }) {
      state.statementStack.push(new Statement(state.statementStack.length, args.text));
    },
    ADD_TRUTH_STATEMENT_TO_PREMISE_STACK(
      state,
      args: { statement: Statement; truthValue: boolean },
    ) {
      state.premiseStack.push(
        new TruthStatement(state.premiseStack.length, args.statement, args.truthValue),
      );
    },
    ADD_PROPOSITION_TO_PREMISE_STACK(
      state,
      args: { type: PropositionType; truthStatements: TruthStatement[] },
    ) {
      state.premiseStack.push(
        new Proposition(state.premiseStack.length, args.type, args.truthStatements),
      );
    },
    ADD_TO_ARGUMENT_STACK(
      state,
      args: { premises: Premise[]; conclusion: Premise; title?: string },
    ) {
      state.argumentStack.push(
        new Argument(state.argumentStack.length, args.premises, args.conclusion, args.title),
      );
    },
  },
  actions: {
    addToStatementStack(context, newStatement: Statement) {
      context.commit('ADD_TO_STATEMENT_STACK', newStatement);
    },
    addTruthStatementToPremiseStack(context, newPremise: Premise) {
      context.commit('ADD_TRUTH_STATEMENT_TO_PREMISE_STACK', newPremise);
    },
    addPropositionToPremiseStack(context, newPremise: Premise) {
      context.commit('ADD_PROPOSITION_TO_PREMISE_STACK', newPremise);
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
    getStatementFromStackById: (state) => (statementId: number) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      state.statementStack.find((statement) => statement.id === statementId),
    getPremiseFromStackById: (state) => (premiseId: number) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      state.premiseStack.find((premise) => premise.id === premiseId),
  },
});
