import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblSchoolNetworkService,
    TblSchoolNetworkPopupService,
    TblSchoolNetworkComponent,
    TblSchoolNetworkDetailComponent,
    TblSchoolNetworkDialogComponent,
    TblSchoolNetworkPopupComponent,
    TblSchoolNetworkDeletePopupComponent,
    TblSchoolNetworkDeleteDialogComponent,
    tblSchoolNetworkRoute,
    tblSchoolNetworkPopupRoute
} from './';
import { SchoolarTblSchoolNetworkSchoolModule } from '../tbl-school-network-school/tbl-school-network-school.module';

const ENTITY_STATES = [
    ...tblSchoolNetworkRoute,
    ...tblSchoolNetworkPopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        SchoolarTblSchoolNetworkSchoolModule
    ],
    declarations: [
        TblSchoolNetworkComponent,
        TblSchoolNetworkDetailComponent,
        TblSchoolNetworkDialogComponent,
        TblSchoolNetworkDeleteDialogComponent,
        TblSchoolNetworkPopupComponent,
        TblSchoolNetworkDeletePopupComponent,
    ],
    entryComponents: [
        TblSchoolNetworkComponent,
        TblSchoolNetworkDialogComponent,
        TblSchoolNetworkPopupComponent,
        TblSchoolNetworkDeleteDialogComponent,
        TblSchoolNetworkDeletePopupComponent,
    ],
    providers: [
        TblSchoolNetworkService,
        TblSchoolNetworkPopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblSchoolNetworkModule {}
