import { Premise } from './interfaces/Premise';
import { PropositionType } from './interfaces/PropositionType';

class Proposition implements Premise {
  id: number;

  type: PropositionType;

  premises: Premise[];

  constructor(id: number, type: PropositionType, premises: Premise[]) {
    this.id = id;
    this.type = type;
    this.premises = premises;
  }
}

export default Proposition;
