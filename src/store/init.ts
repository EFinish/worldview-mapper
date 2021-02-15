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
  context.commit('ADD_TO_ARGUMENT_STACK',
    {
      premises: [
        context.getters.getPremiseFromStackById(0),
        context.getters.getPremiseFromStackById(1),
      ],
      conclusion: context.getters.getPremiseFromStackById(2),
    });
  context.commit('ADD_TO_ARGUMENT_STACK',
    {
      premises: [
        context.getters.getPremiseFromStackById(1),
        context.getters.getPremiseFromStackById(3),
      ],
      conclusion: context.getters.getPremiseFromStackById(3),
    });
}
