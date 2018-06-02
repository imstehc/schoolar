import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblRoleService,
    TblRolePopupService,
    TblRoleComponent,
    TblRoleDetailComponent,
    TblRoleDialogComponent,
    TblRolePopupComponent,
    TblRoleDeletePopupComponent,
    TblRoleDeleteDialogComponent,
    tblRoleRoute,
    tblRolePopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblRoleRoute,
    ...tblRolePopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblRoleComponent,
        TblRoleDetailComponent,
        TblRoleDialogComponent,
        TblRoleDeleteDialogComponent,
        TblRolePopupComponent,
        TblRoleDeletePopupComponent,
    ],
    entryComponents: [
        TblRoleComponent,
        TblRoleDialogComponent,
        TblRolePopupComponent,
        TblRoleDeleteDialogComponent,
        TblRoleDeletePopupComponent,
    ],
    providers: [
        TblRoleService,
        TblRolePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblRoleModule {}
