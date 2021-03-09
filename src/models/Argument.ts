import { Premise } from '@/models/Premise';

export interface Argument {
  id: number;
  title: string;
  premises: Premise[];
  conclusion: Premise;
}
