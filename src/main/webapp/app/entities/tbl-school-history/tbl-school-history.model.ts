import { BaseEntity } from './../../shared';

export class TblSchoolHistory implements BaseEntity {
    constructor(
        public id?: number,
        public strCode?: string,
        public strName?: string,
        public strLegalName?: string,
        public strEmail?: string,
        public strPhoto?: string,
        public idSchoolType?: number,
        public strCNPJ?: string,
        public strNEP?: string,
        public strNEPName?: string,
        public intExcluded?: number,
        public dtmChanged?: any,
        public dtmLastUpdate?: any,
        public school?: BaseEntity,
        public userAuthor?: BaseEntity,
        public audienceClient?: BaseEntity,
        public generalProcedureType?: BaseEntity,
    ) {
    }
}
