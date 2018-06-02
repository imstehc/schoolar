import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';

import {
    SchoolarSharedLibsModule,
    SchoolarSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    JhiLoginModalComponent,
    Principal,
    HasAnyAuthorityDirective,
} from './';
import { AddressComponent } from './address/address.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        SchoolarSharedLibsModule,
        SchoolarSharedCommonModule,
        NgxMaskModule.forRoot()
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        AddressComponent
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        UserService,
        DatePipe
    ],
    entryComponents: [
        JhiLoginModalComponent,
        AddressComponent

    ],
    exports: [
        SchoolarSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe,
        AddressComponent    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SchoolarSharedModule { }
