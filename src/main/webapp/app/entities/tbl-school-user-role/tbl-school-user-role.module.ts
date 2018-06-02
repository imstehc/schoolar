import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblSchoolUserRoleService,
    TblSchoolUserRolePopupService,
    TblSchoolUserRoleComponent,
    TblSchoolUserRoleDetailComponent,
    TblSchoolUserRoleDialogComponent,
    TblSchoolUserRolePopupComponent,
    TblSchoolUserRoleDeletePopupComponent,
    TblSchoolUserRoleDeleteDialogComponent,
    tblSchoolUserRoleRoute,
    tblSchoolUserRolePopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblSchoolUserRoleRoute,
    ...tblSchoolUserRolePopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblSchoolUserRoleComponent,
        TblSchoolUserRoleDetailComponent,
        TblSchoolUserRoleDialogComponent,
        TblSchoolUserRoleDeleteDialogComponent,
        TblSchoolUserRolePopupComponent,
        TblSchoolUserRoleDeletePopupComponent,
    ],
    entryComponents: [
        TblSchoolUserRoleComponent,
        TblSchoolUserRoleDialogComponent,
        TblSchoolUserRolePopupComponent,
        TblSchoolUserRoleDeleteDialogComponent,
        TblSchoolUserRoleDeletePopupComponent,
    ],
    providers: [
        TblSchoolUserRoleService,
        TblSchoolUserRolePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblSchoolUserRoleModule {}
