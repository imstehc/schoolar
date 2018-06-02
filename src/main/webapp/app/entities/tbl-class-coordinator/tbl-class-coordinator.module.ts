import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblClassCoordinatorService,
    TblClassCoordinatorPopupService,
    TblClassCoordinatorComponent,
    TblClassCoordinatorDetailComponent,
    TblClassCoordinatorDialogComponent,
    TblClassCoordinatorPopupComponent,
    TblClassCoordinatorDeletePopupComponent,
    TblClassCoordinatorDeleteDialogComponent,
    tblClassCoordinatorRoute,
    tblClassCoordinatorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblClassCoordinatorRoute,
    ...tblClassCoordinatorPopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblClassCoordinatorComponent,
        TblClassCoordinatorDetailComponent,
        TblClassCoordinatorDialogComponent,
        TblClassCoordinatorDeleteDialogComponent,
        TblClassCoordinatorPopupComponent,
        TblClassCoordinatorDeletePopupComponent,
    ],
    entryComponents: [
        TblClassCoordinatorComponent,
        TblClassCoordinatorDialogComponent,
        TblClassCoordinatorPopupComponent,
        TblClassCoordinatorDeleteDialogComponent,
        TblClassCoordinatorDeletePopupComponent,
    ],
    providers: [
        TblClassCoordinatorService,
        TblClassCoordinatorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblClassCoordinatorModule {}
