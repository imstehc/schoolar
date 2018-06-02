import { BaseEntity } from './../../shared';

export class TblClass implements BaseEntity {
    constructor(
        public id?: number,
        public strName?: string,
        public intYear?: number,
        public dtmCreated?: any,
        public dtmLastUpdate?: any,
        public intExcluded?: number,
        public tblSchool?: BaseEntity,
        public tblShiftType?: BaseEntity,
    ) {
    }
}
