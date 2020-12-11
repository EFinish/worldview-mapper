import { Error } from '@/utils/errors/Error';

export interface Payload {
    data: any;
    status: string;
    error?: Error;
}
