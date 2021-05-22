import { Premise } from './interfaces/Premise';
import { PropositionType } from './interfaces/PropositionType';
import TruthStatement from './TruthStatement';

class Proposition implements Premise {
  id: number;

  type: PropositionType;

  truthStatements: TruthStatement[];

  constructor(id: number, type: PropositionType, truthStatements: TruthStatement[]) {
    this.id = id;
    this.type = type;
    this.truthStatements = truthStatements;
  }
}

export default Proposition;
