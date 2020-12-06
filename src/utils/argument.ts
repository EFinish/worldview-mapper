import { Argument } from '@/models';

const ArgumentCalculator = (function () {
  function isArgumentValid(argument: Argument): boolean {
    // if all premises are assumed true, will the conclusion follow?
    return true;
  }

  return {
    isArgumentValid,
  };
}());

export default ArgumentCalculator;
