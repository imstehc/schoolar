import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchoolarSharedModule } from '../../shared';
import {
    TblAddressService,
    TblAddressPopupService,
    TblAddressComponent,
    TblAddressDetailComponent,
    TblAddressDialogComponent,
    TblAddressPopupComponent,
    TblAddressDeletePopupComponent,
    TblAddressDeleteDialogComponent,
    tblAddressRoute,
    tblAddressPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tblAddressRoute,
    ...tblAddressPopupRoute,
];

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TblAddressComponent,
        TblAddressDetailComponent,
        TblAddressDialogComponent,
        TblAddressDeleteDialogComponent,
        TblAddressPopupComponent,
        TblAddressDeletePopupComponent,
    ],
    entryComponents: [
        TblAddressComponent,
        TblAddressDialogComponent,
        TblAddressPopupComponent,
        TblAddressDeleteDialogComponent,
        TblAddressDeletePopupComponent,
    ],
    providers: [
        TblAddressService,
        TblAddressPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblAddressModule {}
