import { PropositionTypes } from '@/utils/constants';

const propositionTypes = PropositionTypes;

export default function initStoreForTesting(context) {
  // STATEMENTS
  // context.commit('ADD_TO_STATEMENT_STACK', { text: 'the weather is snowing' });
  // context.commit('ADD_TO_STATEMENT_STACK', { text: 'I will drink hot tea' });
  // context.commit('ADD_TO_STATEMENT_STACK', { text: 'sleep will come to me' });
  // context.commit('ADD_TO_STATEMENT_STACK', { text: 'my body will be healthier' });
  context.commit('ADD_TO_STATEMENT_STACK', { text: 'A' });
  context.commit('ADD_TO_STATEMENT_STACK', { text: 'B' });
  context.commit('ADD_TO_STATEMENT_STACK', { text: 'C' });
  context.commit('ADD_TO_STATEMENT_STACK', { text: 'D' });
  // TRUTH STATEMENTS
  context.commit('ADD_TRUTH_STATEMENT_TO_PREMISE_STACK', {
    statement: context.getters.getStatementFromStackById(0),
    truthValue: true,
  });
  context.commit('ADD_TRUTH_STATEMENT_TO_PREMISE_STACK', {
    statement: context.getters.getStatementFromStackById(0),
    truthValue: false,
  });
  context.commit('ADD_TRUTH_STATEMENT_TO_PREMISE_STACK', {
    statement: context.getters.getStatementFromStackById(1),
    truthValue: true,
  });
  context.commit('ADD_TRUTH_STATEMENT_TO_PREMISE_STACK', {
    statement: context.getters.getStatementFromStackById(1),
    truthValue: false,
  });
  context.commit('ADD_TRUTH_STATEMENT_TO_PREMISE_STACK', {
    statement: context.getters.getStatementFromStackById(2),
    truthValue: true,
  });
  context.commit('ADD_TRUTH_STATEMENT_TO_PREMISE_STACK', {
    statement: context.getters.getStatementFromStackById(2),
    truthValue: false,
  });
  context.commit('ADD_TRUTH_STATEMENT_TO_PREMISE_STACK', {
    statement: context.getters.getStatementFromStackById(3),
    truthValue: true,
  });
  context.commit('ADD_TRUTH_STATEMENT_TO_PREMISE_STACK', {
    statement: context.getters.getStatementFromStackById(3),
    truthValue: false,
  });
  // PROPOSITIONS
  context.commit('ADD_PROPOSITION_TO_PREMISE_STACK', {
    type: propositionTypes.IfThen,
    truthStatements: [
      context.getters.getPremiseFromStackById(0),
      context.getters.getPremiseFromStackById(2),
    ],
  });
  context.commit('ADD_PROPOSITION_TO_PREMISE_STACK', {
    type: propositionTypes.IfThen,
    truthStatements: [
      context.getters.getPremiseFromStackById(2),
      context.getters.getPremiseFromStackById(4),
    ],
  });
  context.commit('ADD_PROPOSITION_TO_PREMISE_STACK', {
    type: propositionTypes.IfThen,
    truthStatements: [
      context.getters.getPremiseFromStackById(0),
      context.getters.getPremiseFromStackById(4),
    ],
  });
  context.commit('ADD_PROPOSITION_TO_PREMISE_STACK', {
    type: propositionTypes.IfThen,
    truthStatements: [
      context.getters.getPremiseFromStackById(4),
      context.getters.getPremiseFromStackById(6),
    ],
  });
  context.commit('ADD_PROPOSITION_TO_PREMISE_STACK', {
    type: propositionTypes.Xor,
    truthStatements: [
      context.getters.getPremiseFromStackById(0),
      context.getters.getPremiseFromStackById(2),
    ],
  });
  context.commit('ADD_PROPOSITION_TO_PREMISE_STACK', {
    type: propositionTypes.Or,
    truthStatements: [
      context.getters.getPremiseFromStackById(0),
      context.getters.getPremiseFromStackById(4),
    ],
  });
  context.commit('ADD_PROPOSITION_TO_PREMISE_STACK', {
    type: propositionTypes.Or,
    truthStatements: [
      context.getters.getPremiseFromStackById(2),
      context.getters.getPremiseFromStackById(6),
    ],
  });
  context.commit('ADD_PROPOSITION_TO_PREMISE_STACK', {
    type: propositionTypes.Or,
    truthStatements: [
      context.getters.getPremiseFromStackById(3),
      context.getters.getPremiseFromStackById(7),
    ],
  });
  context.commit('ADD_PROPOSITION_TO_PREMISE_STACK', {
    type: propositionTypes.Or,
    truthStatements: [
      context.getters.getPremiseFromStackById(1),
      context.getters.getPremiseFromStackById(5),
    ],
  });
  context.commit('ADD_PROPOSITION_TO_PREMISE_STACK', {
    type: propositionTypes.Or,
    truthStatements: [
      context.getters.getPremiseFromStackById(0),
      context.getters.getPremiseFromStackById(7),
    ],
  });
  context.commit('ADD_PROPOSITION_TO_PREMISE_STACK', {
    type: propositionTypes.Or,
    truthStatements: [
      context.getters.getPremiseFromStackById(2),
      context.getters.getPremiseFromStackById(5),
    ],
  });
  // ARGUMENTS
  context.commit('ADD_TO_ARGUMENT_STACK', {
    premises: [
      context.getters.getPremiseFromStackById(8),
      context.getters.getPremiseFromStackById(0),
    ],
    conclusion: context.getters.getPremiseFromStackById(2),
    title: 'Modus Ponens x -> y ^ y = x',
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    premises: [
      context.getters.getPremiseFromStackById(8),
      context.getters.getPremiseFromStackById(3),
    ],
    conclusion: context.getters.getPremiseFromStackById(1),
    title: 'Modus Tollens x -> y ^ !y = !x',
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    premises: [
      context.getters.getPremiseFromStackById(8),
      context.getters.getPremiseFromStackById(9),
    ],
    conclusion: context.getters.getPremiseFromStackById(10),
    title: 'Hypothetical Syllogism (p -> q) ^ (q -> r) = (p -> r)',
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    premises: [
      context.getters.getPremiseFromStackById(12),
      context.getters.getPremiseFromStackById(1),
    ],
    conclusion: context.getters.getPremiseFromStackById(2),
    title: 'Disjunctive Syllogism (p V q) ^ !p = q',
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    premises: [
      context.getters.getPremiseFromStackById(8),
      context.getters.getPremiseFromStackById(11),
      context.getters.getPremiseFromStackById(13),
    ],
    conclusion: context.getters.getPremiseFromStackById(14),
    title: 'Constructive Dilemma (p -> q) ^ (r -> s) ^ (p V r) = (q V s)',
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    premises: [
      context.getters.getPremiseFromStackById(8),
      context.getters.getPremiseFromStackById(11),
      context.getters.getPremiseFromStackById(15),
    ],
    conclusion: context.getters.getPremiseFromStackById(16),
    title: 'Destructive Dilemma (p -> q) ^ (r -> s) ^ (!q V !s) = (!p V !r)',
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    premises: [
      context.getters.getPremiseFromStackById(8),
      context.getters.getPremiseFromStackById(11),
      context.getters.getPremiseFromStackById(17),
    ],
    conclusion: context.getters.getPremiseFromStackById(18),
    title: 'Bidirectional Dilemma (p -> q) ^ (r -> s) ^ (p V !s) = (q V !r)',
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    premises: [
      context.getters.getPremiseFromStackById(0),
      context.getters.getPremiseFromStackById(2),
    ],
    conclusion: context.getters.getPremiseFromStackById(0),
    title: 'Simplification p ^ q = 1',
  });
}
