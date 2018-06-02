webpackHotUpdate(0,{

/***/ "./src/main/webapp/app/home/home-internal/home-internal.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar core_1 = __webpack_require__(\"./node_modules/@angular/core/esm5/core.js\");\r\nvar principal_service_1 = __webpack_require__(\"./src/main/webapp/app/shared/auth/principal.service.ts\");\r\nvar navbar_component_1 = __webpack_require__(\"./src/main/webapp/app/layouts/navbar/navbar.component.ts\");\r\nvar HomeInternalComponent = /** @class */ (function () {\r\n    function HomeInternalComponent(principal, navbar) {\r\n        this.principal = principal;\r\n        this.navbar = navbar;\r\n    }\r\n    HomeInternalComponent.prototype.ngOnInit = function () {\r\n        var _this = this;\r\n        this.principal.identity().then(function (account) {\r\n            _this.account = account;\r\n        });\r\n        if (this.navbar.isNotHome) {\r\n            this.isNotHome = true;\r\n        }\r\n        else {\r\n            this.isNotHome = false;\r\n        }\r\n    };\r\n    HomeInternalComponent.prototype.isAuthenticated = function () {\r\n        return this.principal.isAuthenticated();\r\n    };\r\n    HomeInternalComponent.prototype.collapseNavbar = function () {\r\n        this.isNavbarCollapsed = true;\r\n    };\r\n    HomeInternalComponent = __decorate([\r\n        core_1.Component({\r\n            selector: 'jhi-home-internal',\r\n            template: __webpack_require__(\"./src/main/webapp/app/home/home-internal/home-internal.component.html\"),\r\n            styles: [__webpack_require__(\"./src/main/webapp/app/home/home-internal/home-internal.scss\")]\r\n        }),\r\n        __metadata(\"design:paramtypes\", [principal_service_1.Principal,\r\n            navbar_component_1.NavbarComponent])\r\n    ], HomeInternalComponent);\r\n    return HomeInternalComponent;\r\n}());\r\nexports.HomeInternalComponent = HomeInternalComponent;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL2hvbWUvaG9tZS1pbnRlcm5hbC9ob21lLWludGVybmFsLmNvbXBvbmVudC50cz8yZGMyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsOEVBQWtEO0FBQ2xELHdHQUE4RDtBQUM5RCx5R0FBc0U7QUFPdEU7SUFLSSwrQkFDWSxTQUFvQixFQUNwQixNQUF1QjtRQUR2QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLFdBQU0sR0FBTixNQUFNLENBQWlCO0lBQUksQ0FBQztJQUV4Qyx3Q0FBUSxHQUFSO1FBQUEsaUJBU0M7UUFSRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU87WUFDbkMsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDMUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQztJQUNMLENBQUM7SUFDRCwrQ0FBZSxHQUFmO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVELDhDQUFjLEdBQWQ7UUFDRyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0lBQ2pDLENBQUM7SUF6QlEscUJBQXFCO1FBTGpDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLDZCQUFhLHdFQUFnQztZQUM3QyxTQUFTLG1CQUFHLDhEQUFxQjtTQUNsQyxDQUFDO3lDQU95Qiw2QkFBUztZQUNaLGtDQUFlO09BUDFCLHFCQUFxQixDQTJCakM7SUFBRCw0QkFBQztDQUFBO0FBM0JZLHNEQUFxQiIsImZpbGUiOiIuL3NyYy9tYWluL3dlYmFwcC9hcHAvaG9tZS9ob21lLWludGVybmFsL2hvbWUtaW50ZXJuYWwuY29tcG9uZW50LnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UHJpbmNpcGFsfSBmcm9tICcuLi8uLi9zaGFyZWQvYXV0aC9wcmluY2lwYWwuc2VydmljZSc7XG5pbXBvcnQge05hdmJhckNvbXBvbmVudH0gZnJvbSAnLi4vLi4vbGF5b3V0cy9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2poaS1ob21lLWludGVybmFsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2hvbWUtaW50ZXJuYWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnaG9tZS1pbnRlcm5hbC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSG9tZUludGVybmFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBhY2NvdW50OiBBY2NvdW50O1xuICAgIGlzTmF2YmFyQ29sbGFwc2VkOiBib29sZWFuO1xuICAgIGlzTm90SG9tZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcHJpbmNpcGFsOiBQcmluY2lwYWwsXG4gICAgICAgIHByaXZhdGUgbmF2YmFyOiBOYXZiYXJDb21wb25lbnQpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucHJpbmNpcGFsLmlkZW50aXR5KCkudGhlbigoYWNjb3VudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hY2NvdW50ID0gYWNjb3VudDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLm5hdmJhci5pc05vdEhvbWUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNOb3RIb21lID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNOb3RIb21lID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNBdXRoZW50aWNhdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmluY2lwYWwuaXNBdXRoZW50aWNhdGVkKCk7XG4gICAgfVxuXG4gICAgY29sbGFwc2VOYXZiYXIoKSB7XG4gICAgICAgdGhpcy5pc05hdmJhckNvbGxhcHNlZCA9IHRydWU7XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9tYWluL3dlYmFwcC9hcHAvaG9tZS9ob21lLWludGVybmFsL2hvbWUtaW50ZXJuYWwuY29tcG9uZW50LnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/main/webapp/app/home/home-internal/home-internal.component.ts\n");

/***/ })

})