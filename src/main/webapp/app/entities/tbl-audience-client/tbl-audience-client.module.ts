import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchoolarSharedModule } from '../../shared';
import {
    TblAudienceClientService,
    TblAudienceClientPopupService,
    TblAudienceClientComponent,
    TblAudienceClientDetailComponent,
    TblAudienceClientDialogComponent,
    TblAudienceClientPopupComponent,
    TblAudienceClientDeletePopupComponent,
    TblAudienceClientDeleteDialogComponent,
    tblAudienceClientRoute,
    tblAudienceClientPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblAudienceClientRoute,
    ...tblAudienceClientPopupRoute,
];

@NgModule({
    imports: [
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblAudienceClientComponent,
        TblAudienceClientDetailComponent,
        TblAudienceClientDialogComponent,
        TblAudienceClientDeleteDialogComponent,
        TblAudienceClientPopupComponent,
        TblAudienceClientDeletePopupComponent,
    ],
    entryComponents: [
        TblAudienceClientComponent,
        TblAudienceClientDialogComponent,
        TblAudienceClientPopupComponent,
        TblAudienceClientDeleteDialogComponent,
        TblAudienceClientDeletePopupComponent,
    ],
    providers: [
        TblAudienceClientService,
        TblAudienceClientPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblAudienceClientModule {}
