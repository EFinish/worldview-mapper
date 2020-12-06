import { Argument } from '@/models';

const ArgumentCalculator = (function () {
  function isArgumentValid(argument: Argument): boolean {
    // if all premises are assumed true, will the conclusion follow?
    return true;
  }

  function getInvalidPremises(argument: Argument) {
    return [];
  }

  return {
    isArgumentValid,
    getInvalidPremises,
  };
}());

export default ArgumentCalculator;
