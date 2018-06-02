import { BaseEntity } from './../../shared';

export class TblAuthenticate implements BaseEntity {
    constructor(
        public id?: number,
        public dtmTimeStamp?: any,
        public audienceClient?: BaseEntity,
        public user?: BaseEntity,
    ) {
    }
}
