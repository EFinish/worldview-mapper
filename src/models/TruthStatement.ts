import { Premise } from './interfaces/Premise';
import Statement from './Statement';

class TruthStatement implements Premise {
  public id: number;

  public statement: Statement;

  public truthValue: boolean;

  constructor(id: number, statement: Statement, truthValue: boolean) {
    this.id = id;
    this.statement = statement;
    this.truthValue = truthValue;
  }
}

export default TruthStatement;
