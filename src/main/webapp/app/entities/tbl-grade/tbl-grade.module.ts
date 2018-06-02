import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblGradeService,
    TblGradePopupService,
    TblGradeComponent,
    TblGradeDetailComponent,
    TblGradeDialogComponent,
    TblGradePopupComponent,
    TblGradeDeletePopupComponent,
    TblGradeDeleteDialogComponent,
    tblGradeRoute,
    tblGradePopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblGradeRoute,
    ...tblGradePopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblGradeComponent,
        TblGradeDetailComponent,
        TblGradeDialogComponent,
        TblGradeDeleteDialogComponent,
        TblGradePopupComponent,
        TblGradeDeletePopupComponent,
    ],
    entryComponents: [
        TblGradeComponent,
        TblGradeDialogComponent,
        TblGradePopupComponent,
        TblGradeDeleteDialogComponent,
        TblGradeDeletePopupComponent,
    ],
    providers: [
        TblGradeService,
        TblGradePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblGradeModule {}
