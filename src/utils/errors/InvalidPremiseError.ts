import { Premise } from '@/models/interfaces/Premise';

class InvalidPremiseError implements Error {
  premise: Premise;

  message: string;

  name: string;

  constructor(premise: Premise, message: string) {
    this.premise = premise;
    this.message = message;
    this.name = 'Invalid Premise';
  }
}

export default InvalidPremiseError;
