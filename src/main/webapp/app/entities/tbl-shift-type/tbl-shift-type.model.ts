import { BaseEntity } from './../../shared';

export class TblShiftType implements BaseEntity {
    constructor(
        public id?: number,
        public strName?: string,
        public dtmLastUpdate?: any,
    ) {
    }
}
