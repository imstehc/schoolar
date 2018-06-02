webpackHotUpdate(0,{

/***/ "./src/main/webapp/app/home/home.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar core_1 = __webpack_require__(\"./node_modules/@angular/core/esm5/core.js\");\r\nvar router_1 = __webpack_require__(\"./node_modules/@angular/router/esm5/router.js\");\r\nvar shared_1 = __webpack_require__(\"./src/main/webapp/app/shared/index.ts\");\r\nvar _1 = __webpack_require__(\"./src/main/webapp/app/home/index.ts\");\r\nvar home_external_component_1 = __webpack_require__(\"./src/main/webapp/app/home/home-external/home-external.component.ts\");\r\nvar home_internal_component_1 = __webpack_require__(\"./src/main/webapp/app/home/home-internal/home-internal.component.ts\");\r\nvar SchoolarHomeModule = /** @class */ (function () {\r\n    function SchoolarHomeModule() {\r\n    }\r\n    SchoolarHomeModule = __decorate([\r\n        core_1.NgModule({\r\n            imports: [\r\n                shared_1.SchoolarSharedModule,\r\n                router_1.RouterModule.forChild([_1.HOME_ROUTE])\r\n            ],\r\n            declarations: [\r\n                _1.HomeComponent,\r\n                home_external_component_1.HomeExternalComponent,\r\n                home_internal_component_1.HomeInternalComponent\r\n            ],\r\n            entryComponents: [],\r\n            providers: [],\r\n            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]\r\n        })\r\n    ], SchoolarHomeModule);\r\n    return SchoolarHomeModule;\r\n}());\r\nexports.SchoolarHomeModule = SchoolarHomeModule;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL2hvbWUvaG9tZS5tb2R1bGUudHM/ZTMwOCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDhFQUFpRTtBQUNqRSxvRkFBK0M7QUFFL0MsNEVBQWlEO0FBRWpELG9FQUErQztBQUMvQywySEFBZ0Y7QUFDaEYsMkhBQWdGO0FBa0JoRjtJQUFBO0lBQWlDLENBQUM7SUFBckIsa0JBQWtCO1FBaEI5QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsNkJBQW9CO2dCQUNwQixxQkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFFLGFBQVUsQ0FBRSxDQUFDO2FBQ3hDO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLGdCQUFhO2dCQUNiLCtDQUFxQjtnQkFDckIsK0NBQXFCO2FBQ3hCO1lBQ0QsZUFBZSxFQUFFLEVBQ2hCO1lBQ0QsU0FBUyxFQUFFLEVBQ1Y7WUFDRCxPQUFPLEVBQUUsQ0FBQyw2QkFBc0IsQ0FBQztTQUNwQyxDQUFDO09BQ1csa0JBQWtCLENBQUc7SUFBRCx5QkFBQztDQUFBO0FBQXJCLGdEQUFrQiIsImZpbGUiOiIuL3NyYy9tYWluL3dlYmFwcC9hcHAvaG9tZS9ob21lLm1vZHVsZS50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBTY2hvb2xhclNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZCc7XG5cbmltcG9ydCB7IEhPTUVfUk9VVEUsIEhvbWVDb21wb25lbnQgfSBmcm9tICcuLyc7XG5pbXBvcnQgeyBIb21lRXh0ZXJuYWxDb21wb25lbnQgfSBmcm9tICcuL2hvbWUtZXh0ZXJuYWwvaG9tZS1leHRlcm5hbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSG9tZUludGVybmFsQ29tcG9uZW50IH0gZnJvbSAnLi9ob21lLWludGVybmFsL2hvbWUtaW50ZXJuYWwuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIFNjaG9vbGFyU2hhcmVkTW9kdWxlLFxuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoWyBIT01FX1JPVVRFIF0pXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgSG9tZUNvbXBvbmVudCxcbiAgICAgICAgSG9tZUV4dGVybmFsQ29tcG9uZW50LFxuICAgICAgICBIb21lSW50ZXJuYWxDb21wb25lbnRcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgXSxcbiAgICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cbn0pXG5leHBvcnQgY2xhc3MgU2Nob29sYXJIb21lTW9kdWxlIHt9XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9tYWluL3dlYmFwcC9hcHAvaG9tZS9ob21lLm1vZHVsZS50cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/main/webapp/app/home/home.module.ts\n");

/***/ })

})