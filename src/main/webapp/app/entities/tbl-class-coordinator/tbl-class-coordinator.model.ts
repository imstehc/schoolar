import { BaseEntity } from './../../shared';

export class TblClassCoordinator implements BaseEntity {
    constructor(
        public id?: number,
        public dtmLastUpdate?: any,
        public tblUser?: BaseEntity,
        public tblClass?: BaseEntity,
    ) {
    }
}
