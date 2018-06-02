import { BaseEntity } from './../../shared';

export class TblSchoolNetworkSchool implements BaseEntity {
    constructor(
        public id?: number,
        public dtmCreated?: any,
        public dtmLastUpdate?: any,
        public intExcluded?: number,
        public school?: BaseEntity,
        public schoolNetwork?: BaseEntity,
    ) {
    }
}
