webpackHotUpdate(0,{

/***/ "./src/main/webapp/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__webpack_require__(\"./src/main/webapp/app/vendor.ts\");\r\nvar core_1 = __webpack_require__(\"./node_modules/@angular/core/esm5/core.js\");\r\nvar platform_browser_1 = __webpack_require__(\"./node_modules/@angular/platform-browser/esm5/platform-browser.js\");\r\nvar ngx_webstorage_1 = __webpack_require__(\"./node_modules/ngx-webstorage/dist/app.js\");\r\nvar shared_1 = __webpack_require__(\"./src/main/webapp/app/shared/index.ts\");\r\nvar app_routing_module_1 = __webpack_require__(\"./src/main/webapp/app/app-routing.module.ts\");\r\nvar home_module_1 = __webpack_require__(\"./src/main/webapp/app/home/home.module.ts\");\r\nvar admin_module_1 = __webpack_require__(\"./src/main/webapp/app/admin/admin.module.ts\");\r\nvar account_module_1 = __webpack_require__(\"./src/main/webapp/app/account/account.module.ts\");\r\nvar entity_module_1 = __webpack_require__(\"./src/main/webapp/app/entities/entity.module.ts\");\r\nvar http_provider_1 = __webpack_require__(\"./src/main/webapp/app/blocks/interceptor/http.provider.ts\");\r\nvar uib_pagination_config_1 = __webpack_require__(\"./src/main/webapp/app/blocks/config/uib-pagination.config.ts\");\r\n// jhipster-needle-angular-add-module-import JHipster will add new module here\r\nvar layouts_1 = __webpack_require__(\"./src/main/webapp/app/layouts/index.ts\");\r\nvar home_internal_component_1 = __webpack_require__(\"./src/main/webapp/app/home/home-internal/home-internal.component.ts\");\r\nvar home_external_component_1 = __webpack_require__(\"./src/main/webapp/app/home/home-external/home-external.component.ts\");\r\nvar progress_bar_component_1 = __webpack_require__(\"./src/main/webapp/app/shared/progress-bar/progress-bar.component.ts\");\r\nvar SchoolarAppModule = /** @class */ (function () {\r\n    function SchoolarAppModule() {\r\n    }\r\n    SchoolarAppModule = __decorate([\r\n        core_1.NgModule({\r\n            imports: [\r\n                platform_browser_1.BrowserModule,\r\n                app_routing_module_1.SchoolarAppRoutingModule,\r\n                ngx_webstorage_1.Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),\r\n                shared_1.SchoolarSharedModule,\r\n                home_module_1.SchoolarHomeModule,\r\n                admin_module_1.SchoolarAdminModule,\r\n                account_module_1.SchoolarAccountModule,\r\n                entity_module_1.SchoolarEntityModule,\r\n                home_internal_component_1.HomeInternalComponent,\r\n            ],\r\n            declarations: [\r\n                layouts_1.JhiMainComponent,\r\n                layouts_1.NavbarComponent,\r\n                layouts_1.ErrorComponent,\r\n                layouts_1.PageRibbonComponent,\r\n                layouts_1.ActiveMenuDirective,\r\n                layouts_1.FooterComponent,\r\n                home_internal_component_1.HomeInternalComponent,\r\n                home_external_component_1.HomeExternalComponent,\r\n                progress_bar_component_1.ProgressBarComponent\r\n            ],\r\n            providers: [\r\n                layouts_1.ProfileService,\r\n                http_provider_1.customHttpProvider(),\r\n                uib_pagination_config_1.PaginationConfig,\r\n                shared_1.UserRouteAccessService\r\n            ],\r\n            bootstrap: [layouts_1.JhiMainComponent]\r\n        })\r\n    ], SchoolarAppModule);\r\n    return SchoolarAppModule;\r\n}());\r\nexports.SchoolarAppModule = SchoolarAppModule;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL2FwcC5tb2R1bGUudHM/ZGMyYSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHVEQUFxQjtBQUVyQiw4RUFBeUM7QUFDekMsa0hBQTBEO0FBQzFELHdGQUErQztBQUUvQyw0RUFBd0U7QUFDeEUsOEZBQStEO0FBQy9ELHFGQUF3RDtBQUN4RCx3RkFBMkQ7QUFDM0QsOEZBQWlFO0FBQ2pFLDZGQUFnRTtBQUNoRSx1R0FBd0U7QUFDeEUsa0hBQXlFO0FBRXpFLDhFQUE4RTtBQUU5RSw4RUFRbUI7QUFDbkIsMkhBQW1GO0FBQ25GLDJIQUFtRjtBQUNuRiwwSEFBb0Y7QUFrQ3BGO0lBQUE7SUFBZ0MsQ0FBQztJQUFwQixpQkFBaUI7UUFoQzdCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxnQ0FBYTtnQkFDYiw2Q0FBd0I7Z0JBQ3hCLDhCQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFDLENBQUM7Z0JBQ3ZELDZCQUFvQjtnQkFDcEIsZ0NBQWtCO2dCQUNsQixrQ0FBbUI7Z0JBQ25CLHNDQUFxQjtnQkFDckIsb0NBQW9CO2dCQUNwQiwrQ0FBcUI7YUFFeEI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsMEJBQWdCO2dCQUNoQix5QkFBZTtnQkFDZix3QkFBYztnQkFDZCw2QkFBbUI7Z0JBQ25CLDZCQUFtQjtnQkFDbkIseUJBQWU7Z0JBQ2YsK0NBQXFCO2dCQUNyQiwrQ0FBcUI7Z0JBQ3JCLDZDQUFvQjthQUN2QjtZQUNELFNBQVMsRUFBRTtnQkFDUCx3QkFBYztnQkFDZCxrQ0FBa0IsRUFBRTtnQkFDcEIsd0NBQWdCO2dCQUNoQiwrQkFBc0I7YUFDekI7WUFDRCxTQUFTLEVBQUUsQ0FBRSwwQkFBZ0IsQ0FBRTtTQUNsQyxDQUFDO09BQ1csaUJBQWlCLENBQUc7SUFBRCx3QkFBQztDQUFBO0FBQXBCLDhDQUFpQiIsImZpbGUiOiIuL3NyYy9tYWluL3dlYmFwcC9hcHAvYXBwLm1vZHVsZS50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi92ZW5kb3IudHMnO1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgTmcyV2Vic3RvcmFnZSB9IGZyb20gJ25neC13ZWJzdG9yYWdlJztcblxuaW1wb3J0IHsgU2Nob29sYXJTaGFyZWRNb2R1bGUsIFVzZXJSb3V0ZUFjY2Vzc1NlcnZpY2UgfSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQgeyBTY2hvb2xhckFwcFJvdXRpbmdNb2R1bGV9IGZyb20gJy4vYXBwLXJvdXRpbmcubW9kdWxlJztcbmltcG9ydCB7IFNjaG9vbGFySG9tZU1vZHVsZSB9IGZyb20gJy4vaG9tZS9ob21lLm1vZHVsZSc7XG5pbXBvcnQgeyBTY2hvb2xhckFkbWluTW9kdWxlIH0gZnJvbSAnLi9hZG1pbi9hZG1pbi5tb2R1bGUnO1xuaW1wb3J0IHsgU2Nob29sYXJBY2NvdW50TW9kdWxlIH0gZnJvbSAnLi9hY2NvdW50L2FjY291bnQubW9kdWxlJztcbmltcG9ydCB7IFNjaG9vbGFyRW50aXR5TW9kdWxlIH0gZnJvbSAnLi9lbnRpdGllcy9lbnRpdHkubW9kdWxlJztcbmltcG9ydCB7IGN1c3RvbUh0dHBQcm92aWRlciB9IGZyb20gJy4vYmxvY2tzL2ludGVyY2VwdG9yL2h0dHAucHJvdmlkZXInO1xuaW1wb3J0IHsgUGFnaW5hdGlvbkNvbmZpZyB9IGZyb20gJy4vYmxvY2tzL2NvbmZpZy91aWItcGFnaW5hdGlvbi5jb25maWcnO1xuXG4vLyBqaGlwc3Rlci1uZWVkbGUtYW5ndWxhci1hZGQtbW9kdWxlLWltcG9ydCBKSGlwc3RlciB3aWxsIGFkZCBuZXcgbW9kdWxlIGhlcmVcblxuaW1wb3J0IHtcbiAgICBKaGlNYWluQ29tcG9uZW50LFxuICAgIE5hdmJhckNvbXBvbmVudCxcbiAgICBGb290ZXJDb21wb25lbnQsXG4gICAgUHJvZmlsZVNlcnZpY2UsXG4gICAgUGFnZVJpYmJvbkNvbXBvbmVudCxcbiAgICBBY3RpdmVNZW51RGlyZWN0aXZlLFxuICAgIEVycm9yQ29tcG9uZW50XG59IGZyb20gJy4vbGF5b3V0cyc7XG5pbXBvcnQge0hvbWVJbnRlcm5hbENvbXBvbmVudH0gZnJvbSAnLi9ob21lL2hvbWUtaW50ZXJuYWwvaG9tZS1pbnRlcm5hbC5jb21wb25lbnQnO1xuaW1wb3J0IHtIb21lRXh0ZXJuYWxDb21wb25lbnR9IGZyb20gJy4vaG9tZS9ob21lLWV4dGVybmFsL2hvbWUtZXh0ZXJuYWwuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2dyZXNzQmFyQ29tcG9uZW50IH0gZnJvbSAnLi9zaGFyZWQvcHJvZ3Jlc3MtYmFyL3Byb2dyZXNzLWJhci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQnJvd3Nlck1vZHVsZSxcbiAgICAgICAgU2Nob29sYXJBcHBSb3V0aW5nTW9kdWxlLFxuICAgICAgICBOZzJXZWJzdG9yYWdlLmZvclJvb3QoeyBwcmVmaXg6ICdqaGknLCBzZXBhcmF0b3I6ICctJ30pLFxuICAgICAgICBTY2hvb2xhclNoYXJlZE1vZHVsZSxcbiAgICAgICAgU2Nob29sYXJIb21lTW9kdWxlLFxuICAgICAgICBTY2hvb2xhckFkbWluTW9kdWxlLFxuICAgICAgICBTY2hvb2xhckFjY291bnRNb2R1bGUsXG4gICAgICAgIFNjaG9vbGFyRW50aXR5TW9kdWxlLFxuICAgICAgICBIb21lSW50ZXJuYWxDb21wb25lbnQsXG4gICAgICAgIC8vIGpoaXBzdGVyLW5lZWRsZS1hbmd1bGFyLWFkZC1tb2R1bGUgSkhpcHN0ZXIgd2lsbCBhZGQgbmV3IG1vZHVsZSBoZXJlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgSmhpTWFpbkNvbXBvbmVudCxcbiAgICAgICAgTmF2YmFyQ29tcG9uZW50LFxuICAgICAgICBFcnJvckNvbXBvbmVudCxcbiAgICAgICAgUGFnZVJpYmJvbkNvbXBvbmVudCxcbiAgICAgICAgQWN0aXZlTWVudURpcmVjdGl2ZSxcbiAgICAgICAgRm9vdGVyQ29tcG9uZW50LFxuICAgICAgICBIb21lSW50ZXJuYWxDb21wb25lbnQsXG4gICAgICAgIEhvbWVFeHRlcm5hbENvbXBvbmVudCxcbiAgICAgICAgUHJvZ3Jlc3NCYXJDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBQcm9maWxlU2VydmljZSxcbiAgICAgICAgY3VzdG9tSHR0cFByb3ZpZGVyKCksXG4gICAgICAgIFBhZ2luYXRpb25Db25maWcsXG4gICAgICAgIFVzZXJSb3V0ZUFjY2Vzc1NlcnZpY2VcbiAgICBdLFxuICAgIGJvb3RzdHJhcDogWyBKaGlNYWluQ29tcG9uZW50IF1cbn0pXG5leHBvcnQgY2xhc3MgU2Nob29sYXJBcHBNb2R1bGUge31cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL21haW4vd2ViYXBwL2FwcC9hcHAubW9kdWxlLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/main/webapp/app/app.module.ts\n");

/***/ })

})