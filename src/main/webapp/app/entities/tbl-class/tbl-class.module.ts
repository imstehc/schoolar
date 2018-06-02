import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblClassService,
    TblClassPopupService,
    TblClassComponent,
    TblClassDetailComponent,
    TblClassDialogComponent,
    TblClassPopupComponent,
    TblClassDeletePopupComponent,
    TblClassDeleteDialogComponent,
    tblClassRoute,
    tblClassPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblClassRoute,
    ...tblClassPopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblClassComponent,
        TblClassDetailComponent,
        TblClassDialogComponent,
        TblClassDeleteDialogComponent,
        TblClassPopupComponent,
        TblClassDeletePopupComponent,
    ],
    entryComponents: [
        TblClassComponent,
        TblClassDialogComponent,
        TblClassPopupComponent,
        TblClassDeleteDialogComponent,
        TblClassDeletePopupComponent,
    ],
    providers: [
        TblClassService,
        TblClassPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblClassModule {}
