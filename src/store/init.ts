import { Statement, Premise } from '@/models';
import constants from '@/utils/constants';

const premiseTypes = constants.PremiseTypes;

export default function initStoreForTesting(context) {
  context.commit('ADD_TO_STATEMENT_STACK', { text: 'the weather is snowing' } as Statement);
  context.commit('ADD_TO_STATEMENT_STACK', { text: 'I will drink hot tea' } as Statement);
  context.commit('ADD_TO_STATEMENT_STACK', { text: 'sleep will come to me' } as Statement);
  context.commit('ADD_TO_STATEMENT_STACK', { text: 'my body will be healthier' });
  context.commit('ADD_TO_PREMISE_STACK', {
    type: premiseTypes.premiseTypeIfThen,
    statements: [
      context.getters.getStatementFromStackById(0),
      context.getters.getStatementFromStackById(1),
    ],
  } as Premise);
  context.commit('ADD_TO_PREMISE_STACK', {
    type: premiseTypes.premiseTypeTrue,
    statements: [context.getters.getStatementFromStackById(0)],
  } as Premise);
  context.commit('ADD_TO_PREMISE_STACK', {
    type: premiseTypes.premiseTypeTrue,
    statements: [context.getters.getStatementFromStackById(1)],
  } as Premise);
  context.commit('ADD_TO_PREMISE_STACK', {
    type: premiseTypes.premiseTypeFalse,
    statements: [context.getters.getStatementFromStackById(0)],
  } as Premise);
  context.commit('ADD_TO_PREMISE_STACK', {
    type: premiseTypes.premiseTypeFalse,
    statements: [context.getters.getStatementFromStackById(1)],
  } as Premise);
  context.commit('ADD_TO_PREMISE_STACK', {
    type: premiseTypes.premiseTypeOr,
    statements: [
      context.getters.getStatementFromStackById(0),
      context.getters.getStatementFromStackById(1),
    ],
  } as Premise);
  context.commit('ADD_TO_PREMISE_STACK', {
    type: premiseTypes.premiseTypeNor,
    statements: [
      context.getters.getStatementFromStackById(0),
      context.getters.getStatementFromStackById(1),
    ],
  } as Premise);
  context.commit('ADD_TO_PREMISE_STACK', {
    type: premiseTypes.premiseTypeXor,
    statements: [
      context.getters.getStatementFromStackById(0),
      context.getters.getStatementFromStackById(1),
    ],
  } as Premise);
  context.commit('ADD_TO_PREMISE_STACK', {
    type: premiseTypes.premiseTypeXnor,
    statements: [
      context.getters.getStatementFromStackById(0),
      context.getters.getStatementFromStackById(1),
    ],
  } as Premise);
  context.commit('ADD_TO_PREMISE_STACK', {
    type: premiseTypes.premiseTypeAnd,
    statements: [
      context.getters.getStatementFromStackById(0),
      context.getters.getStatementFromStackById(1),
    ],
  } as Premise);
  context.commit('ADD_TO_PREMISE_STACK', {
    type: premiseTypes.premiseTypeNand,
    statements: [
      context.getters.getStatementFromStackById(0),
      context.getters.getStatementFromStackById(1),
    ],
  } as Premise);
  context.commit('ADD_TO_PREMISE_STACK', {
    type: premiseTypes.premiseTypeIfThen,
    statements: [
      context.getters.getStatementFromStackById(1),
      context.getters.getStatementFromStackById(2),
    ],
  } as Premise);
  context.commit('ADD_TO_PREMISE_STACK', {
    type: premiseTypes.premiseTypeIfThen,
    statements: [
      context.getters.getStatementFromStackById(0),
      context.getters.getStatementFromStackById(2),
    ],
  } as Premise);
  context.commit('ADD_TO_PREMISE_STACK', {
    type: premiseTypes.premiseTypeIfThen,
    statements: [
      context.getters.getStatementFromStackById(2),
      context.getters.getStatementFromStackById(3),
    ],
  } as Premise);
  context.commit('ADD_TO_PREMISE_STACK', {
    type: premiseTypes.premiseTypeIfThen,
    statements: [
      context.getters.getStatementFromStackById(0),
      context.getters.getStatementFromStackById(3),
    ],
  } as Premise);
  context.commit('ADD_TO_PREMISE_STACK', {
    type: premiseTypes.premiseTypeOr,
    statements: [
      context.getters.getStatementFromStackById(0),
      context.getters.getStatementFromStackById(2),
    ],
  } as Premise);
  context.commit('ADD_TO_PREMISE_STACK', {
    type: premiseTypes.premiseTypeOr,
    statements: [
      context.getters.getStatementFromStackById(1),
      context.getters.getStatementFromStackById(3),
    ],
  } as Premise);
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'Modus Ponens',
    premises: [
      context.getters.getPremiseFromStackById(0),
      context.getters.getPremiseFromStackById(1),
    ],
    conclusion: context.getters.getPremiseFromStackById(2),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'Modus Tollens',
    premises: [
      context.getters.getPremiseFromStackById(0),
      context.getters.getPremiseFromStackById(4),
    ],
    conclusion: context.getters.getPremiseFromStackById(3),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'Hypothetical Syllogism',
    premises: [
      context.getters.getPremiseFromStackById(0),
      context.getters.getPremiseFromStackById(11),
    ],
    conclusion: context.getters.getPremiseFromStackById(12),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'Hypothetical Syllogism - bigger',
    premises: [
      context.getters.getPremiseFromStackById(0),
      context.getters.getPremiseFromStackById(11),
      context.getters.getPremiseFromStackById(13),
    ],
    conclusion: context.getters.getPremiseFromStackById(14),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'Hypothetical Syllogism - bigger + mixed up',
    premises: [
      context.getters.getPremiseFromStackById(13),
      context.getters.getPremiseFromStackById(0),
      context.getters.getPremiseFromStackById(11),
    ],
    conclusion: context.getters.getPremiseFromStackById(14),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'Hypothetical Syllogism - invalid',
    premises: [
      context.getters.getPremiseFromStackById(0),
      context.getters.getPremiseFromStackById(11),
    ],
    conclusion: context.getters.getPremiseFromStackById(13),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'Dysjunctive Syllogism',
    premises: [
      context.getters.getPremiseFromStackById(7),
      context.getters.getPremiseFromStackById(3),
    ],
    conclusion: context.getters.getPremiseFromStackById(2),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'Dysjunctive Syllogism - invalid',
    premises: [
      context.getters.getPremiseFromStackById(7),
      context.getters.getPremiseFromStackById(3),
    ],
    conclusion: context.getters.getPremiseFromStackById(4),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'Constructive Dilemma',
    premises: [
      context.getters.getPremiseFromStackById(0),
      context.getters.getPremiseFromStackById(13),
      context.getters.getPremiseFromStackById(15),
    ],
    conclusion: context.getters.getPremiseFromStackById(16),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'Constructive Dilemma - invalid',
    premises: [
      context.getters.getPremiseFromStackById(0),
      context.getters.getPremiseFromStackById(12),
      context.getters.getPremiseFromStackById(15),
    ],
    conclusion: context.getters.getPremiseFromStackById(16),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'invalid untrue, x + !x = !x',
    premises: [
      context.getters.getPremiseFromStackById(1),
      context.getters.getPremiseFromStackById(3),
    ],
    conclusion: context.getters.getPremiseFromStackById(3),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'valid true OR',
    premises: [
      context.getters.getPremiseFromStackById(5),
      context.getters.getPremiseFromStackById(2),
    ],
    conclusion: context.getters.getPremiseFromStackById(2),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'valid untrue OR',
    premises: [
      context.getters.getPremiseFromStackById(3),
      context.getters.getPremiseFromStackById(4),
      context.getters.getPremiseFromStackById(5),
    ],
    conclusion: context.getters.getPremiseFromStackById(4),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'valid true NOR',
    premises: [
      context.getters.getPremiseFromStackById(6),
      context.getters.getPremiseFromStackById(3),
      context.getters.getPremiseFromStackById(4),
    ],
    conclusion: context.getters.getPremiseFromStackById(4),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'valid untrue NOR',
    premises: [
      context.getters.getPremiseFromStackById(6),
      context.getters.getPremiseFromStackById(1),
    ],
    conclusion: context.getters.getPremiseFromStackById(1),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'valid true XOR x',
    premises: [
      context.getters.getPremiseFromStackById(7),
      context.getters.getPremiseFromStackById(1),
    ],
    conclusion: context.getters.getPremiseFromStackById(1),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'valid true XOR x + !y',
    premises: [
      context.getters.getPremiseFromStackById(7),
      context.getters.getPremiseFromStackById(1),
      context.getters.getPremiseFromStackById(4),
    ],
    conclusion: context.getters.getPremiseFromStackById(1),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'valid untrue XOR x + y',
    premises: [
      context.getters.getPremiseFromStackById(7),
      context.getters.getPremiseFromStackById(1),
      context.getters.getPremiseFromStackById(2),
    ],
    conclusion: context.getters.getPremiseFromStackById(1),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'valid untrue XOR !x + !y',
    premises: [
      context.getters.getPremiseFromStackById(7),
      context.getters.getPremiseFromStackById(3),
      context.getters.getPremiseFromStackById(4),
    ],
    conclusion: context.getters.getPremiseFromStackById(3),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'valid true XNOR x + y',
    premises: [
      context.getters.getPremiseFromStackById(8),
      context.getters.getPremiseFromStackById(1),
      context.getters.getPremiseFromStackById(2),
    ],
    conclusion: context.getters.getPremiseFromStackById(1),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'valid true XNOR !x + !y',
    premises: [
      context.getters.getPremiseFromStackById(8),
      context.getters.getPremiseFromStackById(3),
      context.getters.getPremiseFromStackById(4),
    ],
    conclusion: context.getters.getPremiseFromStackById(3),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'valid untrue XNOR x',
    premises: [
      context.getters.getPremiseFromStackById(8),
      context.getters.getPremiseFromStackById(1),
    ],
    conclusion: context.getters.getPremiseFromStackById(1),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'valid untrue XNOR x + !y',
    premises: [
      context.getters.getPremiseFromStackById(8),
      context.getters.getPremiseFromStackById(1),
      context.getters.getPremiseFromStackById(4),
    ],
    conclusion: context.getters.getPremiseFromStackById(1),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'valid true x AND y',
    premises: [
      context.getters.getPremiseFromStackById(9),
      context.getters.getPremiseFromStackById(1),
      context.getters.getPremiseFromStackById(2),
    ],
    conclusion: context.getters.getPremiseFromStackById(1),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'valid untrue x AND',
    premises: [
      context.getters.getPremiseFromStackById(9),
      context.getters.getPremiseFromStackById(1),
    ],
    conclusion: context.getters.getPremiseFromStackById(1),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'valid untrue !x AND y',
    premises: [
      context.getters.getPremiseFromStackById(9),
      context.getters.getPremiseFromStackById(3),
      context.getters.getPremiseFromStackById(2),
    ],
    conclusion: context.getters.getPremiseFromStackById(3),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'valid untrue !x AND !y',
    premises: [
      context.getters.getPremiseFromStackById(9),
      context.getters.getPremiseFromStackById(3),
      context.getters.getPremiseFromStackById(4),
    ],
    conclusion: context.getters.getPremiseFromStackById(3),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'valid true x NAND y',
    premises: [
      context.getters.getPremiseFromStackById(10),
      context.getters.getPremiseFromStackById(1),
      context.getters.getPremiseFromStackById(4),
    ],
    conclusion: context.getters.getPremiseFromStackById(1),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'valid true x NAND',
    premises: [
      context.getters.getPremiseFromStackById(10),
      context.getters.getPremiseFromStackById(1),
    ],
    conclusion: context.getters.getPremiseFromStackById(1),
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    title: 'valid untrue x NAND y',
    premises: [
      context.getters.getPremiseFromStackById(10),
      context.getters.getPremiseFromStackById(1),
      context.getters.getPremiseFromStackById(2),
    ],
    conclusion: context.getters.getPremiseFromStackById(1),
  });
}
