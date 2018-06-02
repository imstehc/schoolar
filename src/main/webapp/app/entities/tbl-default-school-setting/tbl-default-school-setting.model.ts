import { BaseEntity } from './../../shared';

export class TblDefaultSchoolSetting implements BaseEntity {
    constructor(
        public id?: number,
        public intYear?: number,
        public intEnabled?: number,
        public dtmLastUpdate?: any,
    ) {
    }
}
