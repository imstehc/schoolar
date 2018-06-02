import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblAuthenticationService,
    TblAuthenticationPopupService,
    TblAuthenticationComponent,
    TblAuthenticationDetailComponent,
    TblAuthenticationDialogComponent,
    TblAuthenticationPopupComponent,
    TblAuthenticationDeletePopupComponent,
    TblAuthenticationDeleteDialogComponent,
    tblAuthenticationRoute,
    tblAuthenticationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblAuthenticationRoute,
    ...tblAuthenticationPopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblAuthenticationComponent,
        TblAuthenticationDetailComponent,
        TblAuthenticationDialogComponent,
        TblAuthenticationDeleteDialogComponent,
        TblAuthenticationPopupComponent,
        TblAuthenticationDeletePopupComponent,
    ],
    entryComponents: [
        TblAuthenticationComponent,
        TblAuthenticationDialogComponent,
        TblAuthenticationPopupComponent,
        TblAuthenticationDeleteDialogComponent,
        TblAuthenticationDeletePopupComponent,
    ],
    providers: [
        TblAuthenticationService,
        TblAuthenticationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblAuthenticationModule {}
