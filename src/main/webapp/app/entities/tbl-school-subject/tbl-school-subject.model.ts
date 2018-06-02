import { BaseEntity } from './../../shared';

export class TblSchoolSubject implements BaseEntity {
    constructor(
        public id?: number,
        public dtmCreated?: any,
        public dtmLastUpdade?: any,
        public intExcluded?: number,
        public tblLevelType?: BaseEntity,
        public tblSubject?: BaseEntity,
        public tblSchool?: BaseEntity,
    ) {
    }
}
