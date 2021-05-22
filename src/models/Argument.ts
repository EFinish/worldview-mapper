import { Premise } from '@/models/interfaces/Premise';

class Argument {
  id: number;

  title: string;

  premises: Premise[];

  conclusion: Premise;

  constructor(id: number, premises: Premise[], conclusion: Premise, title?: string) {
    this.id = id;
    this.title = title || `Argument ${id}`;
    this.premises = premises;
    this.conclusion = conclusion;
  }
}

export default Argument;
