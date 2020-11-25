import { PremiseType } from '@/models/PremiseType';
import { Statement } from '@/models/Statement';

export interface Premise {
    type: PremiseType;
    statements: Statement [];
}
