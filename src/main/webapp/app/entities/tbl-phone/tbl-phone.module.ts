import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblPhoneService,
    TblPhonePopupService,
    TblPhoneComponent,
    TblPhoneDetailComponent,
    TblPhoneDialogComponent,
    TblPhonePopupComponent,
    TblPhoneDeletePopupComponent,
    TblPhoneDeleteDialogComponent,
    tblPhoneRoute,
    tblPhonePopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblPhoneRoute,
    ...tblPhonePopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblPhoneComponent,
        TblPhoneDetailComponent,
        TblPhoneDialogComponent,
        TblPhoneDeleteDialogComponent,
        TblPhonePopupComponent,
        TblPhoneDeletePopupComponent,
    ],
    entryComponents: [
        TblPhoneComponent,
        TblPhoneDialogComponent,
        TblPhonePopupComponent,
        TblPhoneDeleteDialogComponent,
        TblPhoneDeletePopupComponent,
    ],
    providers: [
        TblPhoneService,
        TblPhonePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblPhoneModule {}
