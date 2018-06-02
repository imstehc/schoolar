import { BaseEntity } from './../../shared';

export class TblAddress implements BaseEntity {
    constructor(
        public id?: number,
        public strLabel?: string,
        public strPostCode?: string,
        public strStreet?: string,
        public strNumber?: string,
        public strNeighborhood?: string,
        public strComplement?: string,
        public strCity?: string,
        public strState?: string,
        public strCountry?: string,
        public dtmCreate?: any,
        public dtmLastUpdate?: any,
        public intExcluded?: number,
        public tblUsers?: BaseEntity[],
        public tblSchoolNetworks?: BaseEntity[],
        public tblSchools?: BaseEntity[],
    ) {
    }
}
