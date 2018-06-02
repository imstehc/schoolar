import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblSchoolSubjectService,
    TblSchoolSubjectPopupService,
    TblSchoolSubjectComponent,
    TblSchoolSubjectDetailComponent,
    TblSchoolSubjectDialogComponent,
    TblSchoolSubjectPopupComponent,
    TblSchoolSubjectDeletePopupComponent,
    TblSchoolSubjectDeleteDialogComponent,
    tblSchoolSubjectRoute,
    tblSchoolSubjectPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblSchoolSubjectRoute,
    ...tblSchoolSubjectPopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblSchoolSubjectComponent,
        TblSchoolSubjectDetailComponent,
        TblSchoolSubjectDialogComponent,
        TblSchoolSubjectDeleteDialogComponent,
        TblSchoolSubjectPopupComponent,
        TblSchoolSubjectDeletePopupComponent,
    ],
    entryComponents: [
        TblSchoolSubjectComponent,
        TblSchoolSubjectDialogComponent,
        TblSchoolSubjectPopupComponent,
        TblSchoolSubjectDeleteDialogComponent,
        TblSchoolSubjectDeletePopupComponent,
    ],
    providers: [
        TblSchoolSubjectService,
        TblSchoolSubjectPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblSchoolSubjectModule {}
