import { Premise } from '@/models';

const PremiseUtil = (function () {
  function getFilledLabel(premise: Premise): string {
    let filledLabel = premise.type.label;

    if (premise.statements[0]) {
      filledLabel = filledLabel.replace('p', premise.statements[0].text);
    }

    if (premise.statements[1]) {
      filledLabel = filledLabel.replace('q', premise.statements[1].text);
    }

    return filledLabel;
  }

  return {
    getFilledLabel,
  };
}());

export default PremiseUtil;