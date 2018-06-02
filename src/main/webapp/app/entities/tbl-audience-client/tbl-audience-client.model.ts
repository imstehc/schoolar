import { BaseEntity } from './../../shared';

export class TblAudienceClient implements BaseEntity {
    constructor(
        public id?: number,
        public strBase64Secret?: string,
        public strName?: string,
        public intDaysAccessTokenExpire?: number,
        public intDaysRefreshTokenExpire?: number,
    ) {
    }
}
