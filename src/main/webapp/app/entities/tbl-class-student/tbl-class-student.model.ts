import { BaseEntity } from './../../shared';

export class TblClassStudent implements BaseEntity {
    constructor(
        public id?: number,
        public dtmLastUpdate?: any,
        public tblUser?: BaseEntity,
        public tblClass?: BaseEntity,
    ) {
    }
}
