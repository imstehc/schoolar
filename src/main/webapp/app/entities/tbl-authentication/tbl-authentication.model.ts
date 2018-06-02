import { BaseEntity } from './../../shared';

export class TblAuthentication implements BaseEntity {
    constructor(
        public id?: number,
        public idAuthentication?: number,
        public strCPF?: string,
        public strUserName?: string,
        public strEmail?: string,
        public strPassword?: string,
    ) {
    }
}
