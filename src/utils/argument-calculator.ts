import { Argument } from '@/models';

import constants from '@/utils/constants';

const ArgumentCalculator = (function () {
  function isArgumentValid(argument: Argument): boolean {
    if (this.getInvalidPremises(argument).length > 0) {
      return false;
    }

    return true;
  }

  function getInvalidPremises(argument: Argument) {
    console.log('calculating invalid premises');
    // if all premises are assumed true, will the conclusion follow?
    const trueStatements = [];
    const falseStatements = [];

    // set true and false assumptions according to truth-value setting premises
    argument.premises.forEach((premise) => {
      switch (premise.type.id) {
        case constants.PremiseTypes.premiseTypeTrue.id:
          // set to true
          trueStatements.push(premise.statements[0]);
          break;
        case constants.PremiseTypes.premiseTypeFalse.id:
          // set to false
          falseStatements.push(premise.statements[0]);
          break;
        default:
          break;
      }
    });

    // set true and false assumptions based upon conditional premises
    argument.premises.forEach((premise) => {
      switch (premise.type.id) {
        case constants.PremiseTypes.premiseTypeIfThen.id:
          // if statement a is true, then statement b is true

          break;
        case constants.PremiseTypes.premiseTypeIfThenNot.id:
          break;
        case constants.PremiseTypes.premiseTypeOr.id:
          break;
        case constants.PremiseTypes.premiseTypeNor.id:
          break;
        case constants.PremiseTypes.premiseTypeXor.id:
          break;
        case constants.PremiseTypes.premiseTypeXnor.id:
          break;
        case constants.PremiseTypes.premiseTypeAnd.id:
          break;
        case constants.PremiseTypes.premiseTypeNand.id:
          break;
        default:
          break;
      }
    });

    // todo consider turning this into a while loop so that arguments do not
    //  have to create chronological truth values (even if they should)

    return [];
  }

  return {
    isArgumentValid,
    getInvalidPremises,
  };
}());

export default ArgumentCalculator;
