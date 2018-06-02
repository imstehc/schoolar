import { BaseEntity } from './../../shared';

export class TblSchoolNetwork implements BaseEntity {
    constructor(
        public id?: number,
        public strCode?: string,
        public strName?: string,
        public strLegalName?: string,
        public strCNPJ?: string,
        public strEmail?: string,
        public dtmCreated?: any,
        public dtmLastUpdate?: any,
        public intExcluded?: number,
        public tblPhones?: BaseEntity[],
        public tblAddresses?: BaseEntity[],
    ) {
    }
}
