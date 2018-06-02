import { BaseEntity } from './../../shared';

export class TblSchoolUserRole implements BaseEntity {
    constructor(
        public id?: number,
        public dtmCreated?: any,
        public dtmLastUpdate?: any,
        public intExcluded?: number,
        public role?: BaseEntity,
        public school?: BaseEntity,
        public user?: BaseEntity,
    ) {
    }
}
