import { BaseEntity } from './../../shared';
import { TblSchoolType } from '../tbl-school-type/tbl-school-type.model';

export class TblSchool implements BaseEntity {
    constructor(
        public id?: number,
        public strCode?: string,
        public strName?: string,
        public strLegalName?: string,
        public strEmail?: string,
        public strPhoto?: string,
        public schoolType?: TblSchoolType,
        public strCNPJ?: string,
        public strINEP?: string,
        public strINEPName?: string,
        public dtmCreated?: any,
        public dtmLastUpdate?: any,
        public intExcluded?: number,
        public longitude?: number,
        public latitude?: number,
        public tblAddresses?: BaseEntity[],
        public tblPhones?: BaseEntity[]
    ) {
    }
}
export class SchoolRoles implements BaseEntity {
    constructor(
        public id?: number,
        public strName?: string,
        public checked?: boolean,
        public roleList?: BaseEntity[]
    ) { }
}
export class UserSchool implements BaseEntity {
    constructor(
        public id?: number,
        public checked?: boolean
    ) { }
}
