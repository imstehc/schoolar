import { BaseEntity } from './../../shared';
import * as moment from 'moment';
import Base = moment.unitOfTime.Base;

export class TblUserDTO implements BaseEntity {
    constructor(
        public id?: number,
        public strCPF?: string,
        public strFirstName?: string,
        public strLastName?: string,
        public strNickName?: string,
        public dtmBirthday?: any,
        public strEmail?: string,
        public strPhoto?: string,
        public strGender?: string,
        public intExcluded?: number,
        public tblPhones?: BaseEntity[],
        public tblAddresses?: any,
        // dependente/associado
        public tblUsers?: any,
        public tblGuardians?: BaseEntity[],
        public tblGuardianType?: BaseEntity,
        public tblSchools?: BaseEntity[],
        public nfcs?: BaseEntity[],
        public roles?: BaseEntity[],
        public logins?: BaseEntity[],
        public tblSchoolUserRole?: BaseEntity[],
        public schoolRoles?: BaseEntity[]
    ) {
    }
}

export class TblUserPage {
     constructor(
        public totalElements?: number,
        public content?: any,
        public number?: number,
        public totalPages?: number
     ) {
     }
}
