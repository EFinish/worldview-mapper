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
      response = premise.truthStatements[0]
        ? response.replace('p', getFilledLabel(premise.truthStatements[0]))
        : response;
      response = premise.truthStatements[1]
        ? response.replace('q', getFilledLabel(premise.truthStatements[1]))
        : response;

      return response;
    }

    return 'should not get here';
  };

  return {
    getFilledLabel,
  };
})();

export default PremiseUtil;
