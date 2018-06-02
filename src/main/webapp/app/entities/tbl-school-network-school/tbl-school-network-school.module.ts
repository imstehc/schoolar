import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblSchoolNetworkSchoolService,
    TblSchoolNetworkSchoolPopupService,
    TblSchoolNetworkSchoolComponent,
    TblSchoolNetworkSchoolDetailComponent,
    TblSchoolNetworkSchoolDialogComponent,
    TblSchoolNetworkSchoolPopupComponent,
    TblSchoolNetworkSchoolDeletePopupComponent,
    TblSchoolNetworkSchoolDeleteDialogComponent,
    tblSchoolNetworkSchoolRoute,
    tblSchoolNetworkSchoolPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblSchoolNetworkSchoolRoute,
    ...tblSchoolNetworkSchoolPopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblSchoolNetworkSchoolComponent,
        TblSchoolNetworkSchoolDetailComponent,
        TblSchoolNetworkSchoolDialogComponent,
        TblSchoolNetworkSchoolDeleteDialogComponent,
        TblSchoolNetworkSchoolPopupComponent,
        TblSchoolNetworkSchoolDeletePopupComponent,
    ],
    entryComponents: [
        TblSchoolNetworkSchoolComponent,
        TblSchoolNetworkSchoolDialogComponent,
        TblSchoolNetworkSchoolPopupComponent,
        TblSchoolNetworkSchoolDeleteDialogComponent,
        TblSchoolNetworkSchoolDeletePopupComponent,
    ],
    providers: [
        TblSchoolNetworkSchoolService,
        TblSchoolNetworkSchoolPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblSchoolNetworkSchoolModule {}
