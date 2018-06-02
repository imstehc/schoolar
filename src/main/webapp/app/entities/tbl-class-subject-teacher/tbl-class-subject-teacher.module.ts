import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblClassSubjectTeacherService,
    TblClassSubjectTeacherPopupService,
    TblClassSubjectTeacherComponent,
    TblClassSubjectTeacherDetailComponent,
    TblClassSubjectTeacherDialogComponent,
    TblClassSubjectTeacherPopupComponent,
    TblClassSubjectTeacherDeletePopupComponent,
    TblClassSubjectTeacherDeleteDialogComponent,
    tblClassSubjectTeacherRoute,
    tblClassSubjectTeacherPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblClassSubjectTeacherRoute,
    ...tblClassSubjectTeacherPopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblClassSubjectTeacherComponent,
        TblClassSubjectTeacherDetailComponent,
        TblClassSubjectTeacherDialogComponent,
        TblClassSubjectTeacherDeleteDialogComponent,
        TblClassSubjectTeacherPopupComponent,
        TblClassSubjectTeacherDeletePopupComponent,
    ],
    entryComponents: [
        TblClassSubjectTeacherComponent,
        TblClassSubjectTeacherDialogComponent,
        TblClassSubjectTeacherPopupComponent,
        TblClassSubjectTeacherDeleteDialogComponent,
        TblClassSubjectTeacherDeletePopupComponent,
    ],
    providers: [
        TblClassSubjectTeacherService,
        TblClassSubjectTeacherPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblClassSubjectTeacherModule {}
