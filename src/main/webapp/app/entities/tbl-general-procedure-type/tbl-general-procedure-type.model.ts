import { BaseEntity } from './../../shared';

export class TblGeneralProcedureType implements BaseEntity {
    constructor(
        public id?: number,
        public strName?: string,
        public dtmLastUpdate?: any,
    ) {
    }
}
