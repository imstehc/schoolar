import { BaseEntity } from './../../shared';

export class TblSchoolUser implements BaseEntity {
    constructor(
        public id?: number,
        public dtmCreated?: any,
        public dtmLastUpdate?: any,
        public intExcluded?: number,
        public school?: BaseEntity,
        public user?: BaseEntity,
        public checked?: boolean
    ) {
    }
}
