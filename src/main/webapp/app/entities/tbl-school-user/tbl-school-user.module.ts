import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblSchoolUserService,
    TblSchoolUserPopupService,
    TblSchoolUserComponent,
    TblSchoolUserDetailComponent,
    TblSchoolUserDialogComponent,
    TblSchoolUserPopupComponent,
    TblSchoolUserDeletePopupComponent,
    TblSchoolUserDeleteDialogComponent,
    tblSchoolUserRoute,
    tblSchoolUserPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblSchoolUserRoute,
    ...tblSchoolUserPopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblSchoolUserComponent,
        TblSchoolUserDetailComponent,
        TblSchoolUserDialogComponent,
        TblSchoolUserDeleteDialogComponent,
        TblSchoolUserPopupComponent,
        TblSchoolUserDeletePopupComponent,
    ],
    entryComponents: [
        TblSchoolUserComponent,
        TblSchoolUserDialogComponent,
        TblSchoolUserPopupComponent,
        TblSchoolUserDeleteDialogComponent,
        TblSchoolUserDeletePopupComponent,
    ],
    providers: [
        TblSchoolUserService,
        TblSchoolUserPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblSchoolUserModule {}
