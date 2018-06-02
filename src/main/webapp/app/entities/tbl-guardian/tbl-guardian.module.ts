import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblGuardianService,
    TblGuardianPopupService,
    TblGuardianComponent,
    TblGuardianDetailComponent,
    TblGuardianDialogComponent,
    TblGuardianPopupComponent,
    TblGuardianDeletePopupComponent,
    TblGuardianDeleteDialogComponent,
    tblGuardianRoute,
    tblGuardianPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblGuardianRoute,
    ...tblGuardianPopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblGuardianComponent,
        TblGuardianDetailComponent,
        TblGuardianDialogComponent,
        TblGuardianDeleteDialogComponent,
        TblGuardianPopupComponent,
        TblGuardianDeletePopupComponent,
    ],
    entryComponents: [
        TblGuardianComponent,
        TblGuardianDialogComponent,
        TblGuardianPopupComponent,
        TblGuardianDeleteDialogComponent,
        TblGuardianDeletePopupComponent,
    ],
    providers: [
        TblGuardianService,
        TblGuardianPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblGuardianModule {}
