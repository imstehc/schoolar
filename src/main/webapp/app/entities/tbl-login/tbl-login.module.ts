import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblLoginService,
    TblLoginPopupService,
    TblLoginComponent,
    TblLoginDetailComponent,
    TblLoginDialogComponent,
    TblLoginPopupComponent,
    TblLoginDeletePopupComponent,
    TblLoginDeleteDialogComponent,
    tblLoginRoute,
    tblLoginPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblLoginRoute,
    ...tblLoginPopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblLoginComponent,
        TblLoginDetailComponent,
        TblLoginDialogComponent,
        TblLoginDeleteDialogComponent,
        TblLoginPopupComponent,
        TblLoginDeletePopupComponent,
    ],
    entryComponents: [
        TblLoginComponent,
        TblLoginDialogComponent,
        TblLoginPopupComponent,
        TblLoginDeleteDialogComponent,
        TblLoginDeletePopupComponent,
    ],
    providers: [
        TblLoginService,
        TblLoginPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblLoginModule {}
