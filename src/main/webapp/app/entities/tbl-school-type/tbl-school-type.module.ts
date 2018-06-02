import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblSchoolTypeService,
    TblSchoolTypePopupService,
    TblSchoolTypeComponent,
    TblSchoolTypeDetailComponent,
    TblSchoolTypeDialogComponent,
    TblSchoolTypePopupComponent,
    TblSchoolTypeDeletePopupComponent,
    TblSchoolTypeDeleteDialogComponent,
    tblSchoolTypeRoute,
    tblSchoolTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblSchoolTypeRoute,
    ...tblSchoolTypePopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblSchoolTypeComponent,
        TblSchoolTypeDetailComponent,
        TblSchoolTypeDialogComponent,
        TblSchoolTypeDeleteDialogComponent,
        TblSchoolTypePopupComponent,
        TblSchoolTypeDeletePopupComponent,
    ],
    entryComponents: [
        TblSchoolTypeComponent,
        TblSchoolTypeDialogComponent,
        TblSchoolTypePopupComponent,
        TblSchoolTypeDeleteDialogComponent,
        TblSchoolTypeDeletePopupComponent,
    ],
    providers: [
        TblSchoolTypeService,
        TblSchoolTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblSchoolTypeModule {}
