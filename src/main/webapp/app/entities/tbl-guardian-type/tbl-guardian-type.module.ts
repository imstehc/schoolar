import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblGuardianTypeService,
    TblGuardianTypePopupService,
    TblGuardianTypeComponent,
    TblGuardianTypeDetailComponent,
    TblGuardianTypeDialogComponent,
    TblGuardianTypePopupComponent,
    TblGuardianTypeDeletePopupComponent,
    TblGuardianTypeDeleteDialogComponent,
    tblGuardianTypeRoute,
    tblGuardianTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblGuardianTypeRoute,
    ...tblGuardianTypePopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblGuardianTypeComponent,
        TblGuardianTypeDetailComponent,
        TblGuardianTypeDialogComponent,
        TblGuardianTypeDeleteDialogComponent,
        TblGuardianTypePopupComponent,
        TblGuardianTypeDeletePopupComponent,
    ],
    entryComponents: [
        TblGuardianTypeComponent,
        TblGuardianTypeDialogComponent,
        TblGuardianTypePopupComponent,
        TblGuardianTypeDeleteDialogComponent,
        TblGuardianTypeDeletePopupComponent,
    ],
    providers: [
        TblGuardianTypeService,
        TblGuardianTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblGuardianTypeModule {}
