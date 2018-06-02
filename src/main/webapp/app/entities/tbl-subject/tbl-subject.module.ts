import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblSubjectService,
    TblSubjectPopupService,
    TblSubjectComponent,
    TblSubjectDetailComponent,
    TblSubjectDialogComponent,
    TblSubjectPopupComponent,
    TblSubjectDeletePopupComponent,
    TblSubjectDeleteDialogComponent,
    tblSubjectRoute,
    tblSubjectPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblSubjectRoute,
    ...tblSubjectPopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblSubjectComponent,
        TblSubjectDetailComponent,
        TblSubjectDialogComponent,
        TblSubjectDeleteDialogComponent,
        TblSubjectPopupComponent,
        TblSubjectDeletePopupComponent,
    ],
    entryComponents: [
        TblSubjectComponent,
        TblSubjectDialogComponent,
        TblSubjectPopupComponent,
        TblSubjectDeleteDialogComponent,
        TblSubjectDeletePopupComponent,
    ],
    providers: [
        TblSubjectService,
        TblSubjectPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblSubjectModule {}
