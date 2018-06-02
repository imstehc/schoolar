import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblShiftTypeService,
    TblShiftTypePopupService,
    TblShiftTypeComponent,
    TblShiftTypeDetailComponent,
    TblShiftTypeDialogComponent,
    TblShiftTypePopupComponent,
    TblShiftTypeDeletePopupComponent,
    TblShiftTypeDeleteDialogComponent,
    tblShiftTypeRoute,
    tblShiftTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblShiftTypeRoute,
    ...tblShiftTypePopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblShiftTypeComponent,
        TblShiftTypeDetailComponent,
        TblShiftTypeDialogComponent,
        TblShiftTypeDeleteDialogComponent,
        TblShiftTypePopupComponent,
        TblShiftTypeDeletePopupComponent,
    ],
    entryComponents: [
        TblShiftTypeComponent,
        TblShiftTypeDialogComponent,
        TblShiftTypePopupComponent,
        TblShiftTypeDeleteDialogComponent,
        TblShiftTypeDeletePopupComponent,
    ],
    providers: [
        TblShiftTypeService,
        TblShiftTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblShiftTypeModule {}
