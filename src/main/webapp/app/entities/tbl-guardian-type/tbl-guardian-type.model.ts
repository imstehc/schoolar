import { BaseEntity } from './../../shared';

export class TblGuardianType implements BaseEntity {
    constructor(
        public id?: number,
        public strName?: string,
        public strDescription?: string,
        public dtmLastUpdate?: any,
    ) {
    }
}
