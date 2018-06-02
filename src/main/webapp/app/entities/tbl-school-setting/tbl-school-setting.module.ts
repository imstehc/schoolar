import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblSchoolSettingService,
    TblSchoolSettingPopupService,
    TblSchoolSettingComponent,
    TblSchoolSettingDetailComponent,
    TblSchoolSettingDialogComponent,
    TblSchoolSettingPopupComponent,
    TblSchoolSettingDeletePopupComponent,
    TblSchoolSettingDeleteDialogComponent,
    tblSchoolSettingRoute,
    tblSchoolSettingPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblSchoolSettingRoute,
    ...tblSchoolSettingPopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblSchoolSettingComponent,
        TblSchoolSettingDetailComponent,
        TblSchoolSettingDialogComponent,
        TblSchoolSettingDeleteDialogComponent,
        TblSchoolSettingPopupComponent,
        TblSchoolSettingDeletePopupComponent,
    ],
    entryComponents: [
        TblSchoolSettingComponent,
        TblSchoolSettingDialogComponent,
        TblSchoolSettingPopupComponent,
        TblSchoolSettingDeleteDialogComponent,
        TblSchoolSettingDeletePopupComponent,
    ],
    providers: [
        TblSchoolSettingService,
        TblSchoolSettingPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblSchoolSettingModule {}
