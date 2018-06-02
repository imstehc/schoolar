import { BaseEntity } from './../../shared';

export class TblClassSubjectTeacher implements BaseEntity {
    constructor(
        public id?: number,
        public dtmLastUpdate?: any,
        public tblSubject?: BaseEntity,
        public tblUser?: BaseEntity,
        public tblClass?: BaseEntity,
    ) {
    }
}
