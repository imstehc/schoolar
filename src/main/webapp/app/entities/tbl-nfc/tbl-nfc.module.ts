import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblNfcService,
    TblNfcPopupService,
    TblNfcComponent,
    TblNfcDetailComponent,
    TblNfcDialogComponent,
    TblNfcPopupComponent,
    TblNfcDeletePopupComponent,
    TblNfcDeleteDialogComponent,
    tblNfcRoute,
    tblNfcPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblNfcRoute,
    ...tblNfcPopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblNfcComponent,
        TblNfcDetailComponent,
        TblNfcDialogComponent,
        TblNfcDeleteDialogComponent,
        TblNfcPopupComponent,
        TblNfcDeletePopupComponent,
    ],
    entryComponents: [
        TblNfcComponent,
        TblNfcDialogComponent,
        TblNfcPopupComponent,
        TblNfcDeleteDialogComponent,
        TblNfcDeletePopupComponent,
    ],
    providers: [
        TblNfcService,
        TblNfcPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblNfcModule {}
