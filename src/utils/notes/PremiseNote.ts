import { Premise } from '@/models/interfaces/Premise';
import { Note } from './Note';

class PremiseNote implements Note {
  message: string;

  premise: Premise;

  constructor(message: string, premise: Premise) {
    this.message = message;
    this.premise = premise;
  }
}

export default PremiseNote;
