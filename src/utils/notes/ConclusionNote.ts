import { Note } from './Note';

class ConclusionNote implements Note {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export default ConclusionNote;
