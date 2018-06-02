import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask'

import { SchoolarSharedModule } from '../../shared';
import {
    TblSchoolService,
    TblSchoolPopupService,
    TblSchoolComponent,
    TblSchoolDetailComponent,
    TblSchoolDialogComponent,
    TblSchoolPopupComponent,
    TblSchoolDeletePopupComponent,
    TblSchoolDeleteDialogComponent,
    tblSchoolRoute,
    tblSchoolPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblSchoolRoute,
    ...tblSchoolPopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        NgxMaskModule.forRoot()
    ],
    declarations: [
        TblSchoolComponent,
        TblSchoolDetailComponent,
        TblSchoolDialogComponent,
        TblSchoolDeleteDialogComponent,
        TblSchoolPopupComponent,
        TblSchoolDeletePopupComponent,
    ],
    entryComponents: [
        TblSchoolComponent,
        TblSchoolDialogComponent,
        TblSchoolPopupComponent,
        TblSchoolDeleteDialogComponent,
        TblSchoolDeletePopupComponent,
    ],
    providers: [
        TblSchoolService,
        TblSchoolPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblSchoolModule {}
