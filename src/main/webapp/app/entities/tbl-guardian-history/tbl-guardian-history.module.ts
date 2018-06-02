import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblGuardianHistoryService,
    TblGuardianHistoryPopupService,
    TblGuardianHistoryComponent,
    TblGuardianHistoryDetailComponent,
    TblGuardianHistoryDialogComponent,
    TblGuardianHistoryPopupComponent,
    TblGuardianHistoryDeletePopupComponent,
    TblGuardianHistoryDeleteDialogComponent,
    tblGuardianHistoryRoute,
    tblGuardianHistoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblGuardianHistoryRoute,
    ...tblGuardianHistoryPopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblGuardianHistoryComponent,
        TblGuardianHistoryDetailComponent,
        TblGuardianHistoryDialogComponent,
        TblGuardianHistoryDeleteDialogComponent,
        TblGuardianHistoryPopupComponent,
        TblGuardianHistoryDeletePopupComponent,
    ],
    entryComponents: [
        TblGuardianHistoryComponent,
        TblGuardianHistoryDialogComponent,
        TblGuardianHistoryPopupComponent,
        TblGuardianHistoryDeleteDialogComponent,
        TblGuardianHistoryDeletePopupComponent,
    ],
    providers: [
        TblGuardianHistoryService,
        TblGuardianHistoryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblGuardianHistoryModule {}
