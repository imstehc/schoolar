import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { SchoolarSharedModule, UserRouteAccessService } from './shared';
import { SchoolarAppRoutingModule} from './app-routing.module';
import { SchoolarHomeModule } from './home/home.module';
import { SchoolarAdminModule } from './admin/admin.module';
import { SchoolarAccountModule } from './account/account.module';
import { SchoolarEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';
import { HomeInternalComponent } from './home/home-internal/home-internal.component';
import { HomeExternalComponent } from './home/home-external/home-external.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import {HomeComponent } from './home/home.component';

@NgModule({
    imports: [
        BrowserModule,
        SchoolarAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        SchoolarSharedModule,
        SchoolarHomeModule,
        SchoolarAdminModule,
        SchoolarAccountModule,
        SchoolarEntityModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent,
        HomeInternalComponent,
        HomeExternalComponent,
        ProgressBarComponent,
        HomeComponent

    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class SchoolarAppModule {}
