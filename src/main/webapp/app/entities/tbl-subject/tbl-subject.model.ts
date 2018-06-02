import { BaseEntity } from './../../shared';

export class TblSubject implements BaseEntity {
    constructor(
        public id?: number,
        public strName?: string,
        public strAbbreviation?: string,
        public intOrder?: number,
        public strLabel?: string,
        public dtmCreated?: any,
        public dtmLastUpdate?: any,
        public intExcluded?: number,
    ) {
    }
}
