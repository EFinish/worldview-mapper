import { Premise } from '@/models/interfaces/Premise';
import { Note } from './Note';

class PremiseNote implements Note {
  message: string;

  premise: Premise;

  constructor(premise: Premise, message: string) {
    this.message = message;
    this.premise = premise;
  }
}

export default PremiseNote;
