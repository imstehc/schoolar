webpackHotUpdate(0,{

/***/ "./src/main/webapp/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__webpack_require__(\"./src/main/webapp/app/vendor.ts\");\r\nvar core_1 = __webpack_require__(\"./node_modules/@angular/core/esm5/core.js\");\r\nvar platform_browser_1 = __webpack_require__(\"./node_modules/@angular/platform-browser/esm5/platform-browser.js\");\r\nvar ngx_webstorage_1 = __webpack_require__(\"./node_modules/ngx-webstorage/dist/app.js\");\r\nvar shared_1 = __webpack_require__(\"./src/main/webapp/app/shared/index.ts\");\r\nvar app_routing_module_1 = __webpack_require__(\"./src/main/webapp/app/app-routing.module.ts\");\r\nvar admin_module_1 = __webpack_require__(\"./src/main/webapp/app/admin/admin.module.ts\");\r\nvar account_module_1 = __webpack_require__(\"./src/main/webapp/app/account/account.module.ts\");\r\nvar entity_module_1 = __webpack_require__(\"./src/main/webapp/app/entities/entity.module.ts\");\r\nvar http_provider_1 = __webpack_require__(\"./src/main/webapp/app/blocks/interceptor/http.provider.ts\");\r\nvar uib_pagination_config_1 = __webpack_require__(\"./src/main/webapp/app/blocks/config/uib-pagination.config.ts\");\r\nvar home_internal_component_1 = __webpack_require__(\"./src/main/webapp/app/home/home-internal/home-internal.component.ts\");\r\n// jhipster-needle-angular-add-module-import JHipster will add new module here\r\nvar layouts_1 = __webpack_require__(\"./src/main/webapp/app/layouts/index.ts\");\r\nvar home_external_component_1 = __webpack_require__(\"./src/main/webapp/app/home/home-external/home-external.component.ts\");\r\nvar progress_bar_component_1 = __webpack_require__(\"./src/main/webapp/app/shared/progress-bar/progress-bar.component.ts\");\r\nvar home_component_1 = __webpack_require__(\"./src/main/webapp/app/home/home.component.ts\");\r\nvar SchoolarAppModule = /** @class */ (function () {\r\n    function SchoolarAppModule() {\r\n    }\r\n    SchoolarAppModule = __decorate([\r\n        core_1.NgModule({\r\n            imports: [\r\n                platform_browser_1.BrowserModule,\r\n                app_routing_module_1.SchoolarAppRoutingModule,\r\n                ngx_webstorage_1.Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),\r\n                shared_1.SchoolarSharedModule,\r\n                admin_module_1.SchoolarAdminModule,\r\n                account_module_1.SchoolarAccountModule,\r\n                entity_module_1.SchoolarEntityModule,\r\n                home_internal_component_1.HomeInternalComponent\r\n                // jhipster-needle-angular-add-module JHipster will add new module here\r\n            ],\r\n            declarations: [\r\n                layouts_1.JhiMainComponent,\r\n                layouts_1.NavbarComponent,\r\n                layouts_1.ErrorComponent,\r\n                layouts_1.PageRibbonComponent,\r\n                layouts_1.ActiveMenuDirective,\r\n                layouts_1.FooterComponent,\r\n                home_external_component_1.HomeExternalComponent,\r\n                progress_bar_component_1.ProgressBarComponent,\r\n                home_component_1.HomeComponent,\r\n                home_internal_component_1.HomeInternalComponent\r\n            ],\r\n            providers: [\r\n                layouts_1.ProfileService,\r\n                http_provider_1.customHttpProvider(),\r\n                uib_pagination_config_1.PaginationConfig,\r\n                shared_1.UserRouteAccessService,\r\n                home_internal_component_1.HomeInternalComponent\r\n            ],\r\n            bootstrap: [layouts_1.JhiMainComponent]\r\n        })\r\n    ], SchoolarAppModule);\r\n    return SchoolarAppModule;\r\n}());\r\nexports.SchoolarAppModule = SchoolarAppModule;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL2FwcC5tb2R1bGUudHM/ZGMyYSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHVEQUFxQjtBQUVyQiw4RUFBeUM7QUFDekMsa0hBQTBEO0FBQzFELHdGQUErQztBQUUvQyw0RUFBd0U7QUFDeEUsOEZBQStEO0FBRS9ELHdGQUEyRDtBQUMzRCw4RkFBaUU7QUFDakUsNkZBQWdFO0FBQ2hFLHVHQUF3RTtBQUN4RSxrSEFBeUU7QUFDekUsMkhBQXFGO0FBQ3JGLDhFQUE4RTtBQUU5RSw4RUFRbUI7QUFDbkIsMkhBQW1GO0FBQ25GLDBIQUFvRjtBQUNwRiwyRkFBb0Q7QUFtQ3BEO0lBQUE7SUFBZ0MsQ0FBQztJQUFwQixpQkFBaUI7UUFqQzdCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxnQ0FBYTtnQkFDYiw2Q0FBd0I7Z0JBQ3hCLDhCQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFDLENBQUM7Z0JBQ3ZELDZCQUFvQjtnQkFDcEIsa0NBQW1CO2dCQUNuQixzQ0FBcUI7Z0JBQ3JCLG9DQUFvQjtnQkFDcEIsK0NBQXFCO2dCQUNyQix1RUFBdUU7YUFDMUU7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsMEJBQWdCO2dCQUNoQix5QkFBZTtnQkFDZix3QkFBYztnQkFDZCw2QkFBbUI7Z0JBQ25CLDZCQUFtQjtnQkFDbkIseUJBQWU7Z0JBQ2YsK0NBQXFCO2dCQUNyQiw2Q0FBb0I7Z0JBQ3BCLDhCQUFhO2dCQUNiLCtDQUFxQjthQUN4QjtZQUNELFNBQVMsRUFBRTtnQkFDUCx3QkFBYztnQkFDZCxrQ0FBa0IsRUFBRTtnQkFDcEIsd0NBQWdCO2dCQUNoQiwrQkFBc0I7Z0JBQ3RCLCtDQUFxQjthQUN4QjtZQUNELFNBQVMsRUFBRSxDQUFFLDBCQUFnQixDQUFFO1NBQ2xDLENBQUM7T0FDVyxpQkFBaUIsQ0FBRztJQUFELHdCQUFDO0NBQUE7QUFBcEIsOENBQWlCIiwiZmlsZSI6Ii4vc3JjL21haW4vd2ViYXBwL2FwcC9hcHAubW9kdWxlLnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL3ZlbmRvci50cyc7XG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBOZzJXZWJzdG9yYWdlIH0gZnJvbSAnbmd4LXdlYnN0b3JhZ2UnO1xuXG5pbXBvcnQgeyBTY2hvb2xhclNoYXJlZE1vZHVsZSwgVXNlclJvdXRlQWNjZXNzU2VydmljZSB9IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7IFNjaG9vbGFyQXBwUm91dGluZ01vZHVsZX0gZnJvbSAnLi9hcHAtcm91dGluZy5tb2R1bGUnO1xuaW1wb3J0IHsgU2Nob29sYXJIb21lTW9kdWxlIH0gZnJvbSAnLi9ob21lL2hvbWUubW9kdWxlJztcbmltcG9ydCB7IFNjaG9vbGFyQWRtaW5Nb2R1bGUgfSBmcm9tICcuL2FkbWluL2FkbWluLm1vZHVsZSc7XG5pbXBvcnQgeyBTY2hvb2xhckFjY291bnRNb2R1bGUgfSBmcm9tICcuL2FjY291bnQvYWNjb3VudC5tb2R1bGUnO1xuaW1wb3J0IHsgU2Nob29sYXJFbnRpdHlNb2R1bGUgfSBmcm9tICcuL2VudGl0aWVzL2VudGl0eS5tb2R1bGUnO1xuaW1wb3J0IHsgY3VzdG9tSHR0cFByb3ZpZGVyIH0gZnJvbSAnLi9ibG9ja3MvaW50ZXJjZXB0b3IvaHR0cC5wcm92aWRlcic7XG5pbXBvcnQgeyBQYWdpbmF0aW9uQ29uZmlnIH0gZnJvbSAnLi9ibG9ja3MvY29uZmlnL3VpYi1wYWdpbmF0aW9uLmNvbmZpZyc7XG5pbXBvcnQgeyBIb21lSW50ZXJuYWxDb21wb25lbnQgfSBmcm9tICcuL2hvbWUvaG9tZS1pbnRlcm5hbC9ob21lLWludGVybmFsLmNvbXBvbmVudCc7XG4vLyBqaGlwc3Rlci1uZWVkbGUtYW5ndWxhci1hZGQtbW9kdWxlLWltcG9ydCBKSGlwc3RlciB3aWxsIGFkZCBuZXcgbW9kdWxlIGhlcmVcblxuaW1wb3J0IHtcbiAgICBKaGlNYWluQ29tcG9uZW50LFxuICAgIE5hdmJhckNvbXBvbmVudCxcbiAgICBGb290ZXJDb21wb25lbnQsXG4gICAgUHJvZmlsZVNlcnZpY2UsXG4gICAgUGFnZVJpYmJvbkNvbXBvbmVudCxcbiAgICBBY3RpdmVNZW51RGlyZWN0aXZlLFxuICAgIEVycm9yQ29tcG9uZW50XG59IGZyb20gJy4vbGF5b3V0cyc7XG5pbXBvcnQge0hvbWVFeHRlcm5hbENvbXBvbmVudH0gZnJvbSAnLi9ob21lL2hvbWUtZXh0ZXJuYWwvaG9tZS1leHRlcm5hbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvZ3Jlc3NCYXJDb21wb25lbnQgfSBmcm9tICcuL3NoYXJlZC9wcm9ncmVzcy1iYXIvcHJvZ3Jlc3MtYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQge0hvbWVDb21wb25lbnR9IGZyb20gXCIuL2hvbWUvaG9tZS5jb21wb25lbnRcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEJyb3dzZXJNb2R1bGUsXG4gICAgICAgIFNjaG9vbGFyQXBwUm91dGluZ01vZHVsZSxcbiAgICAgICAgTmcyV2Vic3RvcmFnZS5mb3JSb290KHsgcHJlZml4OiAnamhpJywgc2VwYXJhdG9yOiAnLSd9KSxcbiAgICAgICAgU2Nob29sYXJTaGFyZWRNb2R1bGUsXG4gICAgICAgIFNjaG9vbGFyQWRtaW5Nb2R1bGUsXG4gICAgICAgIFNjaG9vbGFyQWNjb3VudE1vZHVsZSxcbiAgICAgICAgU2Nob29sYXJFbnRpdHlNb2R1bGUsXG4gICAgICAgIEhvbWVJbnRlcm5hbENvbXBvbmVudFxuICAgICAgICAvLyBqaGlwc3Rlci1uZWVkbGUtYW5ndWxhci1hZGQtbW9kdWxlIEpIaXBzdGVyIHdpbGwgYWRkIG5ldyBtb2R1bGUgaGVyZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEpoaU1haW5Db21wb25lbnQsXG4gICAgICAgIE5hdmJhckNvbXBvbmVudCxcbiAgICAgICAgRXJyb3JDb21wb25lbnQsXG4gICAgICAgIFBhZ2VSaWJib25Db21wb25lbnQsXG4gICAgICAgIEFjdGl2ZU1lbnVEaXJlY3RpdmUsXG4gICAgICAgIEZvb3RlckNvbXBvbmVudCxcbiAgICAgICAgSG9tZUV4dGVybmFsQ29tcG9uZW50LFxuICAgICAgICBQcm9ncmVzc0JhckNvbXBvbmVudCxcbiAgICAgICAgSG9tZUNvbXBvbmVudCxcbiAgICAgICAgSG9tZUludGVybmFsQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgUHJvZmlsZVNlcnZpY2UsXG4gICAgICAgIGN1c3RvbUh0dHBQcm92aWRlcigpLFxuICAgICAgICBQYWdpbmF0aW9uQ29uZmlnLFxuICAgICAgICBVc2VyUm91dGVBY2Nlc3NTZXJ2aWNlLFxuICAgICAgICBIb21lSW50ZXJuYWxDb21wb25lbnRcbiAgICBdLFxuICAgIGJvb3RzdHJhcDogWyBKaGlNYWluQ29tcG9uZW50IF1cbn0pXG5leHBvcnQgY2xhc3MgU2Nob29sYXJBcHBNb2R1bGUge31cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL21haW4vd2ViYXBwL2FwcC9hcHAubW9kdWxlLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/main/webapp/app/app.module.ts\n");

/***/ })

})