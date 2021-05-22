import { PropositionType } from '@/models/interfaces/PropositionType';

export const PropositionTypesArray: PropositionType[] = [
  {
    id: 0,
    name: 'IF_THEN',
    label: 'IF p THEN q',
  } as PropositionType,
  {
    id: 2,
    name: 'OR',
    label: 'p OR q',
  } as PropositionType,
  {
    id: 3,
    name: 'NOR',
    label: 'p NOR q',
  } as PropositionType,
  {
    id: 4,
    name: 'XOR',
    label: 'EITHER p OR q (XOR)',
  } as PropositionType,
  {
    id: 5,
    name: 'XNOR',
    label: 'BOTH/NEITHER p AND q (XNOR)',
  } as PropositionType,
  {
    id: 6,
    name: 'AND',
    label: 'p AND q',
  } as PropositionType,
  {
    id: 7,
    name: 'NAND',
    label: 'NOT p AND q (NAND)',
  } as PropositionType,
];

export const PropositionTypes = {
  IfThen: PropositionTypesArray[0],
  Or: PropositionTypesArray[1],
  Nor: PropositionTypesArray[2],
  Xor: PropositionTypesArray[3],
  Xnor: PropositionTypesArray[4],
  And: PropositionTypesArray[5],
  Nand: PropositionTypesArray[6],
};
