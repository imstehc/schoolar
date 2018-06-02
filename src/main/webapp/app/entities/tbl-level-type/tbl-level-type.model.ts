import { BaseEntity } from './../../shared';

export class TblLevelType implements BaseEntity {
    constructor(
        public id?: number,
        public strName?: string,
        public strAbbreviation?: string,
        public intOrder?: number,
        public dtmLastUpdate?: any,
    ) {
    }
}
