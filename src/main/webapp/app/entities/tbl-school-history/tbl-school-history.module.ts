import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblSchoolHistoryService,
    TblSchoolHistoryPopupService,
    TblSchoolHistoryComponent,
    TblSchoolHistoryDetailComponent,
    TblSchoolHistoryDialogComponent,
    TblSchoolHistoryPopupComponent,
    TblSchoolHistoryDeletePopupComponent,
    TblSchoolHistoryDeleteDialogComponent,
    tblSchoolHistoryRoute,
    tblSchoolHistoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblSchoolHistoryRoute,
    ...tblSchoolHistoryPopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblSchoolHistoryComponent,
        TblSchoolHistoryDetailComponent,
        TblSchoolHistoryDialogComponent,
        TblSchoolHistoryDeleteDialogComponent,
        TblSchoolHistoryPopupComponent,
        TblSchoolHistoryDeletePopupComponent,
    ],
    entryComponents: [
        TblSchoolHistoryComponent,
        TblSchoolHistoryDialogComponent,
        TblSchoolHistoryPopupComponent,
        TblSchoolHistoryDeleteDialogComponent,
        TblSchoolHistoryDeletePopupComponent,
    ],
    providers: [
        TblSchoolHistoryService,
        TblSchoolHistoryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblSchoolHistoryModule {}
