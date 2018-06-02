import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TblUserRolesService} from './snippets/tbl-user-roles/tbl-user-roles.service';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgxMaskModule} from 'ngx-mask'

import {SchoolarSharedModule} from '../../shared';
import {
    TblUserService,
    TblUserPopupService,
    TblUserComponent,
    TblUserDetailComponent,
    TblUserDialogComponent,
    TblUserPopupComponent,
    TblUserDeletePopupComponent,
    TblUserDeleteDialogComponent,
    tblUserRoute,
    tblUserPopupRoute,
} from './';
import {TblUserRolesComponent} from './snippets/tbl-user-roles/tbl-user-roles.component';
import {TblUserLoginsComponent} from './snippets/tbl-user-logins/tbl-user-logins.component';

const ENTITY_STATES = [
    ...tblUserRoute,
    ...tblUserPopupRoute,
];

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        SchoolarSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        NgxMaskModule.forRoot()
    ],
    declarations: [
        TblUserComponent,
        TblUserDetailComponent,
        TblUserDialogComponent,
        TblUserDeleteDialogComponent,
        TblUserPopupComponent,
        TblUserDeletePopupComponent,
        TblUserRolesComponent,
        TblUserLoginsComponent
    ],
    entryComponents: [
        TblUserComponent,
        TblUserDialogComponent,
        TblUserPopupComponent,
        TblUserDeleteDialogComponent,
        TblUserDeletePopupComponent,
    ],
    providers: [
        TblUserService,
        TblUserPopupService,
        TblUserRolesService

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolarTblUserModule {
}
