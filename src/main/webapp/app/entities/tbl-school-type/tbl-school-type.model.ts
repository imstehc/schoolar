import { BaseEntity } from './../../shared';

export class TblSchoolType implements BaseEntity {
    constructor(
        public id?: number,
        public strName?: string,
        public dtmLastUpdate?: any
    ) {
    }
}
