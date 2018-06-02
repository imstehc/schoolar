webpackHotUpdate(0,{

/***/ "./src/main/webapp/app/home/home.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar core_1 = __webpack_require__(\"./node_modules/@angular/core/esm5/core.js\");\r\nvar ng_jhipster_1 = __webpack_require__(\"./node_modules/ng-jhipster/index.js\");\r\nvar home_internal_component_1 = __webpack_require__(\"./src/main/webapp/app/home/home-internal/home-internal.component.ts\");\r\nvar shared_1 = __webpack_require__(\"./src/main/webapp/app/shared/index.ts\");\r\nvar HomeComponent = /** @class */ (function () {\r\n    function HomeComponent(principal, eventManager, isNotHome) {\r\n        this.principal = principal;\r\n        this.eventManager = eventManager;\r\n        this.isNotHome = isNotHome;\r\n    }\r\n    HomeComponent.prototype.ngOnInit = function () {\r\n        var _this = this;\r\n        this.principal.identity().then(function (account) {\r\n            _this.account = account;\r\n        });\r\n        this.registerAuthenticationSuccess();\r\n        this.isNotHome.changeFlagHomeFalse(false);\r\n    };\r\n    HomeComponent.prototype.registerAuthenticationSuccess = function () {\r\n        var _this = this;\r\n        this.eventManager.subscribe('authenticationSuccess', function (message) {\r\n            _this.principal.identity().then(function (account) {\r\n                _this.account = account;\r\n            });\r\n        });\r\n    };\r\n    HomeComponent.prototype.isAuthenticated = function () {\r\n        return this.principal.isAuthenticated();\r\n    };\r\n    HomeComponent = __decorate([\r\n        core_1.Component({\r\n            selector: 'jhi-home',\r\n            template: __webpack_require__(\"./src/main/webapp/app/home/home.component.html\"),\r\n            styles: [\r\n                __webpack_require__(\"./src/main/webapp/app/home/home.scss\")\r\n            ]\r\n        }),\r\n        __metadata(\"design:paramtypes\", [shared_1.Principal,\r\n            ng_jhipster_1.JhiEventManager,\r\n            home_internal_component_1.HomeInternalComponent])\r\n    ], HomeComponent);\r\n    return HomeComponent;\r\n}());\r\nexports.HomeComponent = HomeComponent;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL2hvbWUvaG9tZS5jb21wb25lbnQudHM/NjNmMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDhFQUFrRDtBQUVsRCwrRUFBOEM7QUFFOUMsMkhBQWdGO0FBRWhGLDRFQUErQztBQVUvQztJQUdJLHVCQUNZLFNBQW9CLEVBQ3BCLFlBQTZCLEVBQzdCLFNBQWdDO1FBRmhDLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsaUJBQVksR0FBWixZQUFZLENBQWlCO1FBQzdCLGNBQVMsR0FBVCxTQUFTLENBQXVCO0lBRTVDLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQUEsaUJBTUM7UUFMSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU87WUFDcEMsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDRixJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxxREFBNkIsR0FBN0I7UUFBQSxpQkFNQztRQUxJLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLHVCQUF1QixFQUFFLFVBQUMsT0FBTztZQUN6RCxLQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU87Z0JBQ25DLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQsdUNBQWUsR0FBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUE1QlEsYUFBYTtRQVJ6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsNkJBQWEsaURBQXVCO1lBQ3BDLFNBQVc7Z0JBQ1AsMERBQVc7YUFDZDtTQUVKLENBQUM7eUNBS3lCLGtCQUFTO1lBQ04sNkJBQWU7WUFDbEIsK0NBQXFCO09BTm5DLGFBQWEsQ0E4QnpCO0lBQUQsb0JBQUM7Q0FBQTtBQTlCWSxzQ0FBYSIsImZpbGUiOiIuL3NyYy9tYWluL3dlYmFwcC9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ2JNb2RhbFJlZiB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcbmltcG9ydCB7IEpoaUV2ZW50TWFuYWdlciB9IGZyb20gJ25nLWpoaXBzdGVyJztcblxuaW1wb3J0IHsgSG9tZUludGVybmFsQ29tcG9uZW50IH0gZnJvbSAnLi9ob21lLWludGVybmFsL2hvbWUtaW50ZXJuYWwuY29tcG9uZW50JztcblxuaW1wb3J0IHsgQWNjb3VudCwgUHJpbmNpcGFsIH0gZnJvbSAnLi4vc2hhcmVkJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqaGktaG9tZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2hvbWUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogW1xuICAgICAgICAnaG9tZS5zY3NzJ1xuICAgIF1cblxufSlcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBhY2NvdW50OiBBY2NvdW50O1xuICAgIG1vZGFsUmVmOiBOZ2JNb2RhbFJlZjtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBwcmluY2lwYWw6IFByaW5jaXBhbCxcbiAgICAgICAgcHJpdmF0ZSBldmVudE1hbmFnZXI6IEpoaUV2ZW50TWFuYWdlcixcbiAgICAgICAgcHJpdmF0ZSBpc05vdEhvbWU6IEhvbWVJbnRlcm5hbENvbXBvbmVudFxuICAgICkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAgdGhpcy5wcmluY2lwYWwuaWRlbnRpdHkoKS50aGVuKChhY2NvdW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFjY291bnQgPSBhY2NvdW50O1xuICAgICAgICB9KTtcbiAgICAgICAgIHRoaXMucmVnaXN0ZXJBdXRoZW50aWNhdGlvblN1Y2Nlc3MoKTtcbiAgICAgICAgIHRoaXMuaXNOb3RIb21lLmNoYW5nZUZsYWdIb21lRmFsc2UoZmFsc2UpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyQXV0aGVudGljYXRpb25TdWNjZXNzKCkge1xuICAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIuc3Vic2NyaWJlKCdhdXRoZW50aWNhdGlvblN1Y2Nlc3MnLCAobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgIHRoaXMucHJpbmNpcGFsLmlkZW50aXR5KCkudGhlbigoYWNjb3VudCkgPT4ge1xuICAgICAgICAgICAgICAgICB0aGlzLmFjY291bnQgPSBhY2NvdW50O1xuICAgICAgICAgICAgIH0pO1xuICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaXNBdXRoZW50aWNhdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmluY2lwYWwuaXNBdXRoZW50aWNhdGVkKCk7XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9tYWluL3dlYmFwcC9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC50cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/main/webapp/app/home/home.component.ts\n");

/***/ })

})