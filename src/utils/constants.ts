import { PremiseType } from '@/models';

export default {
  PremiseTypes: [
        {
          id: 0, name: 'TRUE', label: 'p IS TRUE (assigns truth value)', numStatements: 1,
        } as PremiseType,
        {
          id: 1, name: 'FALSE', label: 'p IS FALSE (assigns truth value)', numStatements: 1,
        } as PremiseType,
        {
          id: 2, name: 'IF_THEN', label: 'IF p THEN q', numStatements: 2,
        } as PremiseType,
        {
          id: 3, name: 'IF_THEN_NOT', label: 'IF p THEN NOT q', numStatements: 2,
        } as PremiseType,
        {
          id: 4, name: 'OR', label: 'p OR q (OR)', numStatements: 2,
        } as PremiseType,
        {
          id: 5, name: 'NOR', label: 'p NOR q (NOR)', numStatements: 2,
        } as PremiseType,
        {
          id: 6, name: 'XOR', label: 'EITHER p OR q (XOR)', numStatements: 2,
        } as PremiseType,
        {
          id: 7, name: 'XNOR', label: 'EITHER (p AND q) OR (!p AND !q) (XNOR)', numStatements: 2,
        } as PremiseType,
        {
          id: 8, name: 'AND', label: 'p AND q (AND)', numStatements: 2,
        } as PremiseType,
        {
          id: 9, name: 'NAND', label: 'NOT p AND q (NAND)', numStatements: 2,
        } as PremiseType,
  ],
};
