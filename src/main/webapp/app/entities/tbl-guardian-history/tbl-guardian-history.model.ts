import { BaseEntity } from './../../shared';

export class TblGuardianHistory implements BaseEntity {
    constructor(
        public id?: number,
        public dtmChanged?: any,
        public dtmLastUpdate?: any,
        public user?: BaseEntity,
        public guardianUser?: BaseEntity,
        public guardianType?: BaseEntity,
        public userAuthor?: BaseEntity,
        public audienceClient?: BaseEntity,
        public generalProcedureType?: BaseEntity,
    ) {
    }
}
