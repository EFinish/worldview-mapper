import { Premise } from '@/models/interfaces/Premise';
import TruthStatement from '@/models/TruthStatement';
import Proposition from '@/models/Proposition';

const PremiseUtil = (() => {
  const getFilledLabel = (premise: Premise): string => {
    if (premise instanceof TruthStatement) {
      return premise.truthValue
        ? `${premise.statement.text} is TRUE`
        : `${premise.statement.text} is FALSE`;
    }
    if (premise instanceof Proposition) {
      let response = premise.type.label;
      if (premise.premises[0]) {
        if (premise.premises[0] instanceof TruthStatement) {
          response = response.replace('p', getFilledLabel(premise.premises[0]));
        } else if (premise.premises[0] instanceof Proposition) {
          response = response.replace('p', `(${getFilledLabel(premise.premises[0])})`);
        }
      }
      if (premise.premises[1]) {
        if (premise.premises[1] instanceof TruthStatement) {
          response = response.replace('q', getFilledLabel(premise.premises[1]));
        } else if (premise.premises[1] instanceof Proposition) {
          response = response.replace('q', `(${getFilledLabel(premise.premises[1])})`);
        }
      }

      return response;
    }

    return 'should not get here';
  };

  return {
    getFilledLabel,
  };
})();

export default PremiseUtil;
