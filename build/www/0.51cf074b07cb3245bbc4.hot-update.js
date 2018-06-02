webpackHotUpdate(0,{

/***/ "./src/main/webapp/app/home/home-internal/home-internal.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar core_1 = __webpack_require__(\"./node_modules/@angular/core/esm5/core.js\");\r\nvar principal_service_1 = __webpack_require__(\"./src/main/webapp/app/shared/auth/principal.service.ts\");\r\nvar HomeInternalComponent = /** @class */ (function () {\r\n    function HomeInternalComponent(principal) {\r\n        this.principal = principal;\r\n    }\r\n    HomeInternalComponent.prototype.ngOnInit = function () {\r\n        var _this = this;\r\n        this.principal.identity().then(function (account) {\r\n            _this.account = account;\r\n        });\r\n        this.changeFlagHomeFalse();\r\n    };\r\n    HomeInternalComponent.prototype.isAuthenticated = function () {\r\n        return this.principal.isAuthenticated();\r\n    };\r\n    HomeInternalComponent.prototype.changeFlagHomeTrue = function () {\r\n        this.isNotHome = true;\r\n    };\r\n    HomeInternalComponent.prototype.changeFlagHomeFalse = function () {\r\n        this.isNotHome = false;\r\n        console.log(this.isNotHome);\r\n    };\r\n    HomeInternalComponent.prototype.collapseNavbar = function () {\r\n        this.changeFlagHomeFalse();\r\n        this.isNavbarCollapsed = true;\r\n    };\r\n    HomeInternalComponent = __decorate([\r\n        core_1.Component({\r\n            selector: 'jhi-home-internal',\r\n            template: __webpack_require__(\"./src/main/webapp/app/home/home-internal/home-internal.component.html\"),\r\n            styles: [__webpack_require__(\"./src/main/webapp/app/home/home-internal/home-internal.scss\")]\r\n        }),\r\n        __metadata(\"design:paramtypes\", [principal_service_1.Principal])\r\n    ], HomeInternalComponent);\r\n    return HomeInternalComponent;\r\n}());\r\nexports.HomeInternalComponent = HomeInternalComponent;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL2hvbWUvaG9tZS1pbnRlcm5hbC9ob21lLWludGVybmFsLmNvbXBvbmVudC50cz8yZGMyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsOEVBQWtEO0FBQ2xELHdHQUE4RDtBQU85RDtJQUtJLCtCQUNZLFNBQW9CO1FBQXBCLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFBSSxDQUFDO0lBRXJDLHdDQUFRLEdBQVI7UUFBQSxpQkFLQztRQUpHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsT0FBTztZQUNuQyxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCwrQ0FBZSxHQUFmO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVELGtEQUFrQixHQUFsQjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFDRCxtREFBbUIsR0FBbkI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsOENBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7SUFDbEMsQ0FBQztJQTlCUSxxQkFBcUI7UUFMakMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsNkJBQWEsd0VBQWdDO1lBQzdDLFNBQVMsbUJBQUcsOERBQXFCO1NBQ2xDLENBQUM7eUNBT3lCLDZCQUFTO09BTnZCLHFCQUFxQixDQWdDakM7SUFBRCw0QkFBQztDQUFBO0FBaENZLHNEQUFxQiIsImZpbGUiOiIuL3NyYy9tYWluL3dlYmFwcC9hcHAvaG9tZS9ob21lLWludGVybmFsL2hvbWUtaW50ZXJuYWwuY29tcG9uZW50LnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UHJpbmNpcGFsfSBmcm9tICcuLi8uLi9zaGFyZWQvYXV0aC9wcmluY2lwYWwuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2poaS1ob21lLWludGVybmFsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2hvbWUtaW50ZXJuYWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnaG9tZS1pbnRlcm5hbC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSG9tZUludGVybmFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBhY2NvdW50OiBBY2NvdW50O1xuICAgIGlzTmF2YmFyQ29sbGFwc2VkOiBib29sZWFuO1xuICAgIGlzTm90SG9tZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcHJpbmNpcGFsOiBQcmluY2lwYWwpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucHJpbmNpcGFsLmlkZW50aXR5KCkudGhlbigoYWNjb3VudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hY2NvdW50ID0gYWNjb3VudDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY2hhbmdlRmxhZ0hvbWVGYWxzZSgpO1xuICAgIH1cblxuICAgIGlzQXV0aGVudGljYXRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJpbmNpcGFsLmlzQXV0aGVudGljYXRlZCgpO1xuICAgIH1cblxuICAgIGNoYW5nZUZsYWdIb21lVHJ1ZSgpIHtcbiAgICAgICAgdGhpcy5pc05vdEhvbWUgPSB0cnVlO1xuICAgIH1cbiAgICBjaGFuZ2VGbGFnSG9tZUZhbHNlKCkge1xuICAgICAgICB0aGlzLmlzTm90SG9tZSA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmlzTm90SG9tZSk7XG4gICAgfVxuXG4gICAgY29sbGFwc2VOYXZiYXIoKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRmxhZ0hvbWVGYWxzZSgpO1xuICAgICAgICB0aGlzLmlzTmF2YmFyQ29sbGFwc2VkID0gdHJ1ZTtcbiAgICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL21haW4vd2ViYXBwL2FwcC9ob21lL2hvbWUtaW50ZXJuYWwvaG9tZS1pbnRlcm5hbC5jb21wb25lbnQudHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/main/webapp/app/home/home-internal/home-internal.component.ts\n");

/***/ })

})