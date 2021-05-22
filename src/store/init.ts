import { PropositionTypes } from '@/utils/constants';

const propositionTypes = PropositionTypes;

export default function initStoreForTesting(context) {
  // STATEMENTS
  context.commit('ADD_TO_STATEMENT_STACK', { text: 'the weather is snowing' });
  context.commit('ADD_TO_STATEMENT_STACK', { text: 'I will drink hot tea' });
  context.commit('ADD_TO_STATEMENT_STACK', { text: 'sleep will come to me' });
  context.commit('ADD_TO_STATEMENT_STACK', { text: 'my body will be healthier' });
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
      context.getters.getPremiseFromStackById(3),
      context.getters.getPremiseFromStackById(5),
    ],
  });
  // context.commit('ADD_TO_PREMISE_STACK', {
  //   type: premiseTypes.premiseTypeIfThen,
  //   statements: [
  //     context.getters.getStatementFromStackById(0),
  //     context.getters.getStatementFromStackById(1),
  //   ],
  // } as Premise);
  // context.commit('ADD_TO_PREMISE_STACK', {
  //   type: premiseTypes.premiseTypeTrue,
  //   statements: [context.getters.getStatementFromStackById(0)],
  // } as Premise);
  // context.commit('ADD_TO_PREMISE_STACK', {
  //   type: premiseTypes.premiseTypeTrue,
  //   statements: [context.getters.getStatementFromStackById(1)],
  // } as Premise);
  // context.commit('ADD_TO_PREMISE_STACK', {
  //   type: premiseTypes.premiseTypeFalse,
  //   statements: [context.getters.getStatementFromStackById(0)],
  // } as Premise);
  // context.commit('ADD_TO_PREMISE_STACK', {
  //   type: premiseTypes.premiseTypeFalse,
  //   statements: [context.getters.getStatementFromStackById(1)],
  // } as Premise);
  // context.commit('ADD_TO_PREMISE_STACK', {
  //   type: premiseTypes.premiseTypeOr,
  //   statements: [
  //     context.getters.getStatementFromStackById(0),
  //     context.getters.getStatementFromStackById(1),
  //   ],
  // } as Premise);
  // context.commit('ADD_TO_PREMISE_STACK', {
  //   type: premiseTypes.premiseTypeNor,
  //   statements: [
  //     context.getters.getStatementFromStackById(0),
  //     context.getters.getStatementFromStackById(1),
  //   ],
  // } as Premise);
  // context.commit('ADD_TO_PREMISE_STACK', {
  //   type: premiseTypes.premiseTypeXor,
  //   statements: [
  //     context.getters.getStatementFromStackById(0),
  //     context.getters.getStatementFromStackById(1),
  //   ],
  // } as Premise);
  // context.commit('ADD_TO_PREMISE_STACK', {
  //   type: premiseTypes.premiseTypeXnor,
  //   statements: [
  //     context.getters.getStatementFromStackById(0),
  //     context.getters.getStatementFromStackById(1),
  //   ],
  // } as Premise);
  // context.commit('ADD_TO_PREMISE_STACK', {
  //   type: premiseTypes.premiseTypeAnd,
  //   statements: [
  //     context.getters.getStatementFromStackById(0),
  //     context.getters.getStatementFromStackById(1),
  //   ],
  // } as Premise);
  // context.commit('ADD_TO_PREMISE_STACK', {
  //   type: premiseTypes.premiseTypeNand,
  //   statements: [
  //     context.getters.getStatementFromStackById(0),
  //     context.getters.getStatementFromStackById(1),
  //   ],
  // } as Premise);
  // context.commit('ADD_TO_PREMISE_STACK', {
  //   type: premiseTypes.premiseTypeIfThen,
  //   statements: [
  //     context.getters.getStatementFromStackById(1),
  //     context.getters.getStatementFromStackById(2),
  //   ],
  // } as Premise);
  // context.commit('ADD_TO_PREMISE_STACK', {
  //   type: premiseTypes.premiseTypeIfThen,
  //   statements: [
  //     context.getters.getStatementFromStackById(0),
  //     context.getters.getStatementFromStackById(2),
  //   ],
  // } as Premise);
  // context.commit('ADD_TO_PREMISE_STACK', {
  //   type: premiseTypes.premiseTypeIfThen,
  //   statements: [
  //     context.getters.getStatementFromStackById(2),
  //     context.getters.getStatementFromStackById(3),
  //   ],
  // } as Premise);
  // context.commit('ADD_TO_PREMISE_STACK', {
  //   type: premiseTypes.premiseTypeIfThen,
  //   statements: [
  //     context.getters.getStatementFromStackById(0),
  //     context.getters.getStatementFromStackById(3),
  //   ],
  // } as Premise);
  // context.commit('ADD_TO_PREMISE_STACK', {
  //   type: premiseTypes.premiseTypeOr,
  //   statements: [
  //     context.getters.getStatementFromStackById(0),
  //     context.getters.getStatementFromStackById(2),
  //   ],
  // } as Premise);
  // context.commit('ADD_TO_PREMISE_STACK', {
  //   type: premiseTypes.premiseTypeOr,
  //   statements: [
  //     context.getters.getStatementFromStackById(1),
  //     context.getters.getStatementFromStackById(3),
  //   ],
  // } as Premise);
  // ARGUMENTS
  context.commit('ADD_TO_ARGUMENT_STACK', {
    premises: [
      context.getters.getPremiseFromStackById(8),
      context.getters.getPremiseFromStackById(0),
    ],
    conclusion: context.getters.getPremiseFromStackById(2),
    title: 'Modus Ponens',
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    premises: [
      context.getters.getPremiseFromStackById(8),
      context.getters.getPremiseFromStackById(3),
    ],
    conclusion: context.getters.getPremiseFromStackById(1),
    title: 'Modus Tollens',
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    premises: [
      context.getters.getPremiseFromStackById(8),
      context.getters.getPremiseFromStackById(9),
    ],
    conclusion: context.getters.getPremiseFromStackById(10),
    title: 'Hypothetical Syllogism',
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    premises: [
      context.getters.getPremiseFromStackById(12),
      context.getters.getPremiseFromStackById(1),
    ],
    conclusion: context.getters.getPremiseFromStackById(2),
    title: 'Disjunctive Syllogism',
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    premises: [
      context.getters.getPremiseFromStackById(8),
      context.getters.getPremiseFromStackById(11),
      context.getters.getPremiseFromStackById(13),
    ],
    conclusion: context.getters.getPremiseFromStackById(14),
    title: 'Constructive Dilemma',
  });
  context.commit('ADD_TO_ARGUMENT_STACK', {
    premises: [
      context.getters.getPremiseFromStackById(8),
      context.getters.getPremiseFromStackById(11),
      context.getters.getPremiseFromStackById(15),
    ],
    conclusion: context.getters.getPremiseFromStackById(16),
    title: 'Destructive Dilemma',
  });
  // context.commit('ADD_TO_ARGUMENT_STACK', {
  //   title: 'invalid untrue, x + !x = !x',
  //   premises: [
  //     context.getters.getPremiseFromStackById(1),
  //     context.getters.getPremiseFromStackById(3),
  //   ],
  //   conclusion: context.getters.getPremiseFromStackById(3),
  // });
  // context.commit('ADD_TO_ARGUMENT_STACK', {
  //   title: 'valid true OR',
  //   premises: [
  //     context.getters.getPremiseFromStackById(5),
  //     context.getters.getPremiseFromStackById(2),
  //   ],
  //   conclusion: context.getters.getPremiseFromStackById(2),
  // });
  // context.commit('ADD_TO_ARGUMENT_STACK', {
  //   title: 'valid untrue OR',
  //   premises: [
  //     context.getters.getPremiseFromStackById(3),
  //     context.getters.getPremiseFromStackById(4),
  //     context.getters.getPremiseFromStackById(5),
  //   ],
  //   conclusion: context.getters.getPremiseFromStackById(4),
  // });
  // context.commit('ADD_TO_ARGUMENT_STACK', {
  //   title: 'valid true NOR',
  //   premises: [
  //     context.getters.getPremiseFromStackById(6),
  //     context.getters.getPremiseFromStackById(3),
  //     context.getters.getPremiseFromStackById(4),
  //   ],
  //   conclusion: context.getters.getPremiseFromStackById(4),
  // });
  // context.commit('ADD_TO_ARGUMENT_STACK', {
  //   title: 'valid untrue NOR',
  //   premises: [
  //     context.getters.getPremiseFromStackById(6),
  //     context.getters.getPremiseFromStackById(1),
  //   ],
  //   conclusion: context.getters.getPremiseFromStackById(1),
  // });
  // context.commit('ADD_TO_ARGUMENT_STACK', {
  //   title: 'valid true XOR x',
  //   premises: [
  //     context.getters.getPremiseFromStackById(7),
  //     context.getters.getPremiseFromStackById(1),
  //   ],
  //   conclusion: context.getters.getPremiseFromStackById(1),
  // });
  // context.commit('ADD_TO_ARGUMENT_STACK', {
  //   title: 'valid true XOR x + !y',
  //   premises: [
  //     context.getters.getPremiseFromStackById(7),
  //     context.getters.getPremiseFromStackById(1),
  //     context.getters.getPremiseFromStackById(4),
  //   ],
  //   conclusion: context.getters.getPremiseFromStackById(1),
  // });
  // context.commit('ADD_TO_ARGUMENT_STACK', {
  //   title: 'valid untrue XOR x + y',
  //   premises: [
  //     context.getters.getPremiseFromStackById(7),
  //     context.getters.getPremiseFromStackById(1),
  //     context.getters.getPremiseFromStackById(2),
  //   ],
  //   conclusion: context.getters.getPremiseFromStackById(1),
  // });
  // context.commit('ADD_TO_ARGUMENT_STACK', {
  //   title: 'valid untrue XOR !x + !y',
  //   premises: [
  //     context.getters.getPremiseFromStackById(7),
  //     context.getters.getPremiseFromStackById(3),
  //     context.getters.getPremiseFromStackById(4),
  //   ],
  //   conclusion: context.getters.getPremiseFromStackById(3),
  // });
  // context.commit('ADD_TO_ARGUMENT_STACK', {
  //   title: 'valid true XNOR x + y',
  //   premises: [
  //     context.getters.getPremiseFromStackById(8),
  //     context.getters.getPremiseFromStackById(1),
  //     context.getters.getPremiseFromStackById(2),
  //   ],
  //   conclusion: context.getters.getPremiseFromStackById(1),
  // });
  // context.commit('ADD_TO_ARGUMENT_STACK', {
  //   title: 'valid true XNOR !x + !y',
  //   premises: [
  //     context.getters.getPremiseFromStackById(8),
  //     context.getters.getPremiseFromStackById(3),
  //     context.getters.getPremiseFromStackById(4),
  //   ],
  //   conclusion: context.getters.getPremiseFromStackById(3),
  // });
  // context.commit('ADD_TO_ARGUMENT_STACK', {
  //   title: 'valid untrue XNOR x',
  //   premises: [
  //     context.getters.getPremiseFromStackById(8),
  //     context.getters.getPremiseFromStackById(1),
  //   ],
  //   conclusion: context.getters.getPremiseFromStackById(1),
  // });
  // context.commit('ADD_TO_ARGUMENT_STACK', {
  //   title: 'valid untrue XNOR x + !y',
  //   premises: [
  //     context.getters.getPremiseFromStackById(8),
  //     context.getters.getPremiseFromStackById(1),
  //     context.getters.getPremiseFromStackById(4),
  //   ],
  //   conclusion: context.getters.getPremiseFromStackById(1),
  // });
  // context.commit('ADD_TO_ARGUMENT_STACK', {
  //   title: 'valid true x AND y',
  //   premises: [
  //     context.getters.getPremiseFromStackById(9),
  //     context.getters.getPremiseFromStackById(1),
  //     context.getters.getPremiseFromStackById(2),
  //   ],
  //   conclusion: context.getters.getPremiseFromStackById(1),
  // });
  // context.commit('ADD_TO_ARGUMENT_STACK', {
  //   title: 'valid untrue x AND',
  //   premises: [
  //     context.getters.getPremiseFromStackById(9),
  //     context.getters.getPremiseFromStackById(1),
  //   ],
  //   conclusion: context.getters.getPremiseFromStackById(1),
  // });
  // context.commit('ADD_TO_ARGUMENT_STACK', {
  //   title: 'valid untrue !x AND y',
  //   premises: [
  //     context.getters.getPremiseFromStackById(9),
  //     context.getters.getPremiseFromStackById(3),
  //     context.getters.getPremiseFromStackById(2),
  //   ],
  //   conclusion: context.getters.getPremiseFromStackById(3),
  // });
  // context.commit('ADD_TO_ARGUMENT_STACK', {
  //   title: 'valid untrue !x AND !y',
  //   premises: [
  //     context.getters.getPremiseFromStackById(9),
  //     context.getters.getPremiseFromStackById(3),
  //     context.getters.getPremiseFromStackById(4),
  //   ],
  //   conclusion: context.getters.getPremiseFromStackById(3),
  // });
  // context.commit('ADD_TO_ARGUMENT_STACK', {
  //   title: 'valid true x NAND y',
  //   premises: [
  //     context.getters.getPremiseFromStackById(10),
  //     context.getters.getPremiseFromStackById(1),
  //     context.getters.getPremiseFromStackById(4),
  //   ],
  //   conclusion: context.getters.getPremiseFromStackById(1),
  // });
  // context.commit('ADD_TO_ARGUMENT_STACK', {
  //   title: 'valid true x NAND',
  //   premises: [
  //     context.getters.getPremiseFromStackById(10),
  //     context.getters.getPremiseFromStackById(1),
  //   ],
  //   conclusion: context.getters.getPremiseFromStackById(1),
  // });
  // context.commit('ADD_TO_ARGUMENT_STACK', {
  //   title: 'valid untrue x NAND y',
  //   premises: [
  //     context.getters.getPremiseFromStackById(10),
  //     context.getters.getPremiseFromStackById(1),
  //     context.getters.getPremiseFromStackById(2),
  //   ],
  //   conclusion: context.getters.getPremiseFromStackById(1),
  // });
}
