import { Premise } from '@/models';
import { Error } from './Error';

export interface InvalidPremiseError extends Error {
    premise: Premise;
}
