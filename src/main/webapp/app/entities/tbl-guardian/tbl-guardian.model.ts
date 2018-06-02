import { BaseEntity } from './../../shared';

export class TblGuardian implements BaseEntity {
    constructor(
        public id?: number,
        public dtmLastUpdate?: any,
        public user?: any,
        public guardianUser?: any,
        public guardianType?: any
    ) { }
}
