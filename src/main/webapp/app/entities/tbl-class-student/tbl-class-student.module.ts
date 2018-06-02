import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblClassStudentService,
    TblClassStudentPopupService,
    TblClassStudentComponent,
    TblClassStudentDetailComponent,
    TblClassStudentDialogComponent,
    TblClassStudentPopupComponent,
    TblClassStudentDeletePopupComponent,
    TblClassStudentDeleteDialogComponent,
    tblClassStudentRoute,
    tblClassStudentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblClassStudentRoute,
    ...tblClassStudentPopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblClassStudentComponent,
        TblClassStudentDetailComponent,
        TblClassStudentDialogComponent,
        TblClassStudentDeleteDialogComponent,
        TblClassStudentPopupComponent,
        TblClassStudentDeletePopupComponent,
    ],
    entryComponents: [
        TblClassStudentComponent,
        TblClassStudentDialogComponent,
        TblClassStudentPopupComponent,
        TblClassStudentDeleteDialogComponent,
        TblClassStudentDeletePopupComponent,
    ],
    providers: [
        TblClassStudentService,
        TblClassStudentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblClassStudentModule {}
