import { BaseEntity } from './../../shared';

export class TblPhone implements BaseEntity {
    constructor(
        public id?: number,
        public strPrefix?: string,
        public strNumber?: string,
        public strPhoneType?: string,
        public strLabel?: string,
        public dtmCreated?: any,
        public dtmLastUpdate?: any,
        public intExcluded?: number,
        public tblUsers?: BaseEntity[],
        public tblSchoolNetworks?: BaseEntity[],
        public tblSchools?: BaseEntity[],
    ) {
    }
}
