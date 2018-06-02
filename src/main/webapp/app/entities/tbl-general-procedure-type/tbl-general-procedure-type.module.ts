import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblGeneralProcedureTypeService,
    TblGeneralProcedureTypePopupService,
    TblGeneralProcedureTypeComponent,
    TblGeneralProcedureTypeDetailComponent,
    TblGeneralProcedureTypeDialogComponent,
    TblGeneralProcedureTypePopupComponent,
    TblGeneralProcedureTypeDeletePopupComponent,
    TblGeneralProcedureTypeDeleteDialogComponent,
    tblGeneralProcedureTypeRoute,
    tblGeneralProcedureTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblGeneralProcedureTypeRoute,
    ...tblGeneralProcedureTypePopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblGeneralProcedureTypeComponent,
        TblGeneralProcedureTypeDetailComponent,
        TblGeneralProcedureTypeDialogComponent,
        TblGeneralProcedureTypeDeleteDialogComponent,
        TblGeneralProcedureTypePopupComponent,
        TblGeneralProcedureTypeDeletePopupComponent,
    ],
    entryComponents: [
        TblGeneralProcedureTypeComponent,
        TblGeneralProcedureTypeDialogComponent,
        TblGeneralProcedureTypePopupComponent,
        TblGeneralProcedureTypeDeleteDialogComponent,
        TblGeneralProcedureTypeDeletePopupComponent,
    ],
    providers: [
        TblGeneralProcedureTypeService,
        TblGeneralProcedureTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblGeneralProcedureTypeModule {}
