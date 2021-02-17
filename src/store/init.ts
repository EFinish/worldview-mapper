import {
  Statement, Premise, Argument,
} from '@/models';
import constants from '@/utils/constants';

const premiseTypes = constants.PremiseTypes;

export default function initStoreForTesting(context) {
  context.commit('ADD_TO_STATEMENT_STACK', { text: 'It is snowing' } as Statement);
  context.commit('ADD_TO_STATEMENT_STACK', { text: 'I will drink hot tea' } as Statement);
  context.commit('ADD_TO_PREMISE_STACK',
        {
          type: premiseTypes.premiseTypeIfThen,
          statements: [
            context.getters.getStatementFromStackById(0),
            context.getters.getStatementFromStackById(1),
          ],
        } as Premise);
  context.commit('ADD_TO_PREMISE_STACK',
        {
          type: premiseTypes.premiseTypeTrue,
          statements: [
            context.getters.getStatementFromStackById(0),
          ],
        } as Premise);
  context.commit('ADD_TO_PREMISE_STACK',
        {
          type: premiseTypes.premiseTypeTrue,
          statements: [
            context.getters.getStatementFromStackById(1),
          ],
        } as Premise);
  context.commit('ADD_TO_PREMISE_STACK',
        {
          type: premiseTypes.premiseTypeFalse,
          statements: [
            context.getters.getStatementFromStackById(0),
          ],
        } as Premise);
  context.commit('ADD_TO_PREMISE_STACK',
        {
          type: premiseTypes.premiseTypeFalse,
          statements: [
            context.getters.getStatementFromStackById(1),
          ],
        } as Premise);
  context.commit('ADD_TO_PREMISE_STACK',
        {
          type: premiseTypes.premiseTypeOr,
          statements: [
            context.getters.getStatementFromStackById(0),
            context.getters.getStatementFromStackById(1),
          ],
        } as Premise);
  context.commit('ADD_TO_PREMISE_STACK',
        {
          type: premiseTypes.premiseTypeNor,
          statements: [
            context.getters.getStatementFromStackById(0),
            context.getters.getStatementFromStackById(1),
          ],
        } as Premise);
  context.commit('ADD_TO_ARGUMENT_STACK',
    {
      title: 'valid true modus ponens',
      premises: [
        context.getters.getPremiseFromStackById(0),
        context.getters.getPremiseFromStackById(1),
      ],
      conclusion: context.getters.getPremiseFromStackById(2),
    });
  context.commit('ADD_TO_ARGUMENT_STACK',
    {
      title: 'valid true modus tollens',
      premises: [
        context.getters.getPremiseFromStackById(0),
        context.getters.getPremiseFromStackById(4),
      ],
      conclusion: context.getters.getPremiseFromStackById(3),
    });
  context.commit('ADD_TO_ARGUMENT_STACK',
    {
      title: 'invalid untrue, x + !x = !x',
      premises: [
        context.getters.getPremiseFromStackById(1),
        context.getters.getPremiseFromStackById(3),
      ],
      conclusion: context.getters.getPremiseFromStackById(3),
    });
  context.commit('ADD_TO_ARGUMENT_STACK',
    {
      title: 'valid true OR',
      premises: [
        context.getters.getPremiseFromStackById(5),
        context.getters.getPremiseFromStackById(2),
      ],
      conclusion: context.getters.getPremiseFromStackById(2),
    });
  context.commit('ADD_TO_ARGUMENT_STACK',
    {
      title: 'valid untrue OR',
      premises: [
        context.getters.getPremiseFromStackById(3),
        context.getters.getPremiseFromStackById(4),
        context.getters.getPremiseFromStackById(5),
      ],
      conclusion: context.getters.getPremiseFromStackById(4),
    });
  context.commit('ADD_TO_ARGUMENT_STACK',
    {
      title: 'valid true NOR',
      premises: [
        context.getters.getPremiseFromStackById(6),
        context.getters.getPremiseFromStackById(3),
        context.getters.getPremiseFromStackById(4),
      ],
      conclusion: context.getters.getPremiseFromStackById(4),
    });
  context.commit('ADD_TO_ARGUMENT_STACK',
    {
      title: 'valid untrue NOR',
      premises: [
        context.getters.getPremiseFromStackById(6),
        context.getters.getPremiseFromStackById(1),
      ],
      conclusion: context.getters.getPremiseFromStackById(1),
    });
}
