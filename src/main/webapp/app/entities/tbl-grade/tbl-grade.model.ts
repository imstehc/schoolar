import { BaseEntity } from './../../shared';

export class TblGrade implements BaseEntity {
    constructor(
        public id?: number,
        public strName?: string,
        public intNumber?: number,
        public dtmCreated?: any,
        public dtmLastUpdate?: any,
        public intExcluded?: number,
        public strLabel?: string,
        public tblLevelType?: BaseEntity,
    ) {
    }
}
