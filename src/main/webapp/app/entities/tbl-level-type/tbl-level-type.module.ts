import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblLevelTypeService,
    TblLevelTypePopupService,
    TblLevelTypeComponent,
    TblLevelTypeDetailComponent,
    TblLevelTypeDialogComponent,
    TblLevelTypePopupComponent,
    TblLevelTypeDeletePopupComponent,
    TblLevelTypeDeleteDialogComponent,
    tblLevelTypeRoute,
    tblLevelTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblLevelTypeRoute,
    ...tblLevelTypePopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblLevelTypeComponent,
        TblLevelTypeDetailComponent,
        TblLevelTypeDialogComponent,
        TblLevelTypeDeleteDialogComponent,
        TblLevelTypePopupComponent,
        TblLevelTypeDeletePopupComponent,
    ],
    entryComponents: [
        TblLevelTypeComponent,
        TblLevelTypeDialogComponent,
        TblLevelTypePopupComponent,
        TblLevelTypeDeleteDialogComponent,
        TblLevelTypeDeletePopupComponent,
    ],
    providers: [
        TblLevelTypeService,
        TblLevelTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblLevelTypeModule {}
