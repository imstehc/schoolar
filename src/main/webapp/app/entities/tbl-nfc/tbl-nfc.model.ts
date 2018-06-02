import { BaseEntity } from './../../shared';

export class TblNfc implements BaseEntity {
    constructor(
        public id?: number,
        public strName?: string,
        public dtmLastUpdate?: any,
        public user?: BaseEntity,
    ) {
    }
}
