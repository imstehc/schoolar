import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblDefaultSchoolSettingService,
    TblDefaultSchoolSettingPopupService,
    TblDefaultSchoolSettingComponent,
    TblDefaultSchoolSettingDetailComponent,
    TblDefaultSchoolSettingDialogComponent,
    TblDefaultSchoolSettingPopupComponent,
    TblDefaultSchoolSettingDeletePopupComponent,
    TblDefaultSchoolSettingDeleteDialogComponent,
    tblDefaultSchoolSettingRoute,
    tblDefaultSchoolSettingPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblDefaultSchoolSettingRoute,
    ...tblDefaultSchoolSettingPopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblDefaultSchoolSettingComponent,
        TblDefaultSchoolSettingDetailComponent,
        TblDefaultSchoolSettingDialogComponent,
        TblDefaultSchoolSettingDeleteDialogComponent,
        TblDefaultSchoolSettingPopupComponent,
        TblDefaultSchoolSettingDeletePopupComponent,
    ],
    entryComponents: [
        TblDefaultSchoolSettingComponent,
        TblDefaultSchoolSettingDialogComponent,
        TblDefaultSchoolSettingPopupComponent,
        TblDefaultSchoolSettingDeleteDialogComponent,
        TblDefaultSchoolSettingDeletePopupComponent,
    ],
    providers: [
        TblDefaultSchoolSettingService,
        TblDefaultSchoolSettingPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblDefaultSchoolSettingModule {}
