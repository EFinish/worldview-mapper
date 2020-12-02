import { PremiseType } from '@/models/PremiseType';
import { Statement } from '@/models/Statement';

export interface Premise {
    id: number;
    type: PremiseType;
    statements: Statement [];
}
