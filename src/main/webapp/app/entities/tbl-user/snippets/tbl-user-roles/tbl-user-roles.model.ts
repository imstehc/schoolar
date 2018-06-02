export class TblUserRolesModel {
    constructor(
        public id?: number,
        public roleId?: number,
        public role?: any,
        public strName?: string,
        public strDescription?: string,
        public user?: any,
        public school?: any,
        public schoolList?: any,
        public roleList?: any
    ) {
    }
}
