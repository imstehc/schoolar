import { BaseEntity } from './../../shared';

export class TblLogin implements BaseEntity {
    constructor(
        public id?: number,
        public strUserName?: string,
        public strFirstName?: string,
        public strLastName?: string,
        public userStrEmail?: string,
        public strPassword?: string,
        public dtmLastUpdate?: any,
        public user?: BaseEntity
    ) {
    }
}
