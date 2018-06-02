import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblAuthenticateService,
    TblAuthenticatePopupService,
    TblAuthenticateComponent,
    TblAuthenticateDetailComponent,
    TblAuthenticateDialogComponent,
    TblAuthenticatePopupComponent,
    TblAuthenticateDeletePopupComponent,
    TblAuthenticateDeleteDialogComponent,
    tblAuthenticateRoute,
    tblAuthenticatePopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblAuthenticateRoute,
    ...tblAuthenticatePopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblAuthenticateComponent,
        TblAuthenticateDetailComponent,
        TblAuthenticateDialogComponent,
        TblAuthenticateDeleteDialogComponent,
        TblAuthenticatePopupComponent,
        TblAuthenticateDeletePopupComponent,
    ],
    entryComponents: [
        TblAuthenticateComponent,
        TblAuthenticateDialogComponent,
        TblAuthenticatePopupComponent,
        TblAuthenticateDeleteDialogComponent,
        TblAuthenticateDeletePopupComponent,
    ],
    providers: [
        TblAuthenticateService,
        TblAuthenticatePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblAuthenticateModule {}
