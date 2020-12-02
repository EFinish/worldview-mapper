import { Premise } from '@/models/Premise';

export interface Argument {
    id: number;
    premises: Premise[];
}
