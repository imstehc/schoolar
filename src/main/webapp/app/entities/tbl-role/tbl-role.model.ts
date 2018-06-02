import { BaseEntity } from './../../shared';

export class TblRole implements BaseEntity {
    constructor(
        public id?: number,
        public strName?: string,
        public strDescription?: string,
        public dtmCreated?: any,
        public dtmLastUpdate?: any,
        public intExcluded?: number,
        public intCanBeImpersonated?: number
    ) { }
}
