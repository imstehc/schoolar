webpackHotUpdate(0,{

/***/ "./src/main/webapp/app/home/home-internal/home-internal.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar core_1 = __webpack_require__(\"./node_modules/@angular/core/esm5/core.js\");\r\nvar principal_service_1 = __webpack_require__(\"./src/main/webapp/app/shared/auth/principal.service.ts\");\r\nvar router_1 = __webpack_require__(\"./node_modules/@angular/router/esm5/router.js\");\r\nvar HomeInternalComponent = /** @class */ (function () {\r\n    function HomeInternalComponent(principal, router) {\r\n        this.principal = principal;\r\n        this.router = router;\r\n    }\r\n    HomeInternalComponent.prototype.ngOnInit = function () {\r\n        var _this = this;\r\n        this.principal.identity().then(function (account) {\r\n            _this.account = account;\r\n        });\r\n        this.getPageTitle(this.router.routerState.snapshot.root);\r\n    };\r\n    HomeInternalComponent.prototype.isAuthenticated = function () {\r\n        return this.principal.isAuthenticated();\r\n    };\r\n    HomeInternalComponent.prototype.collapseNavbar = function () {\r\n        this.isNavbarCollapsed = true;\r\n    };\r\n    HomeInternalComponent.prototype.getPageTitle = function (routeSnapshot) {\r\n        var title = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'schoolarApp';\r\n        if (routeSnapshot.firstChild) {\r\n            title = this.getPageTitle(routeSnapshot.firstChild) || title;\r\n        }\r\n        if (title == 'home.title') {\r\n            this.isHome = true;\r\n        }\r\n        else {\r\n            this.isHome = false;\r\n        }\r\n        console.log('home-internal', this.isHome);\r\n        return title;\r\n    };\r\n    HomeInternalComponent = __decorate([\r\n        core_1.Component({\r\n            selector: 'jhi-home-internal',\r\n            template: __webpack_require__(\"./src/main/webapp/app/home/home-internal/home-internal.component.html\"),\r\n            styles: [__webpack_require__(\"./src/main/webapp/app/home/home-internal/home-internal.scss\")]\r\n        }),\r\n        __metadata(\"design:paramtypes\", [principal_service_1.Principal,\r\n            router_1.Router])\r\n    ], HomeInternalComponent);\r\n    return HomeInternalComponent;\r\n}());\r\nexports.HomeInternalComponent = HomeInternalComponent;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL2hvbWUvaG9tZS1pbnRlcm5hbC9ob21lLWludGVybmFsLmNvbXBvbmVudC50cz8yZGMyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsOEVBQWtEO0FBQ2xELHdHQUE4RDtBQUM5RCxvRkFBK0Q7QUFPL0Q7SUFJSSwrQkFDWSxTQUFvQixFQUNwQixNQUFjO1FBRGQsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQzFCLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU87WUFDbkMsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsK0NBQWUsR0FBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRCw4Q0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztJQUNsQyxDQUFDO0lBRU8sNENBQVksR0FBcEIsVUFBcUIsYUFBcUM7UUFDdEQsSUFBSSxLQUFLLEdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO1FBQzlILEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLENBQUM7UUFDakUsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFMUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBdENRLHFCQUFxQjtRQUxqQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG1CQUFtQjtZQUM3Qiw2QkFBYSx3RUFBZ0M7WUFDN0MsU0FBUyxtQkFBRyw4REFBcUI7U0FDbEMsQ0FBQzt5Q0FNeUIsNkJBQVM7WUFDWixlQUFNO09BTmpCLHFCQUFxQixDQXdDakM7SUFBRCw0QkFBQztDQUFBO0FBeENZLHNEQUFxQiIsImZpbGUiOiIuL3NyYy9tYWluL3dlYmFwcC9hcHAvaG9tZS9ob21lLWludGVybmFsL2hvbWUtaW50ZXJuYWwuY29tcG9uZW50LnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UHJpbmNpcGFsfSBmcm9tICcuLi8uLi9zaGFyZWQvYXV0aC9wcmluY2lwYWwuc2VydmljZSc7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdqaGktaG9tZS1pbnRlcm5hbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9ob21lLWludGVybmFsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2hvbWUtaW50ZXJuYWwuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVJbnRlcm5hbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgYWNjb3VudDogQWNjb3VudDtcbiAgICBpc05hdmJhckNvbGxhcHNlZDogYm9vbGVhbjtcbiAgICBpc0hvbWU6IGFueTtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBwcmluY2lwYWw6IFByaW5jaXBhbCxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnByaW5jaXBhbC5pZGVudGl0eSgpLnRoZW4oKGFjY291bnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWNjb3VudCA9IGFjY291bnQ7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmdldFBhZ2VUaXRsZSh0aGlzLnJvdXRlci5yb3V0ZXJTdGF0ZS5zbmFwc2hvdC5yb290KTtcbiAgICB9XG5cbiAgICBpc0F1dGhlbnRpY2F0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByaW5jaXBhbC5pc0F1dGhlbnRpY2F0ZWQoKTtcbiAgICB9XG5cbiAgICBjb2xsYXBzZU5hdmJhcigpIHtcbiAgICAgICAgdGhpcy5pc05hdmJhckNvbGxhcHNlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQYWdlVGl0bGUocm91dGVTbmFwc2hvdDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCkge1xuICAgICAgICBsZXQgdGl0bGU6IHN0cmluZyA9IChyb3V0ZVNuYXBzaG90LmRhdGEgJiYgcm91dGVTbmFwc2hvdC5kYXRhWydwYWdlVGl0bGUnXSkgPyByb3V0ZVNuYXBzaG90LmRhdGFbJ3BhZ2VUaXRsZSddIDogJ3NjaG9vbGFyQXBwJztcbiAgICAgICAgaWYgKHJvdXRlU25hcHNob3QuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGl0bGUgPSB0aGlzLmdldFBhZ2VUaXRsZShyb3V0ZVNuYXBzaG90LmZpcnN0Q2hpbGQpIHx8IHRpdGxlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRpdGxlID09ICdob21lLnRpdGxlJykge1xuICAgICAgICAgICAgdGhpcy5pc0hvbWUgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc0hvbWUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnaG9tZS1pbnRlcm5hbCcsIHRoaXMuaXNIb21lKTtcblxuICAgICAgICByZXR1cm4gdGl0bGU7XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9tYWluL3dlYmFwcC9hcHAvaG9tZS9ob21lLWludGVybmFsL2hvbWUtaW50ZXJuYWwuY29tcG9uZW50LnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/main/webapp/app/home/home-internal/home-internal.component.ts\n");

/***/ }),

/***/ "./src/main/webapp/app/layouts/main/main.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar core_1 = __webpack_require__(\"./node_modules/@angular/core/esm5/core.js\");\r\nvar router_1 = __webpack_require__(\"./node_modules/@angular/router/esm5/router.js\");\r\nvar shared_1 = __webpack_require__(\"./src/main/webapp/app/shared/index.ts\");\r\nvar JhiMainComponent = /** @class */ (function () {\r\n    function JhiMainComponent(principal, jhiLanguageHelper, router) {\r\n        this.principal = principal;\r\n        this.jhiLanguageHelper = jhiLanguageHelper;\r\n        this.router = router;\r\n        this.securityReady = false;\r\n    }\r\n    JhiMainComponent.prototype.getPageTitle = function (routeSnapshot) {\r\n        var title = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'schoolarApp';\r\n        if (routeSnapshot.firstChild) {\r\n            title = this.getPageTitle(routeSnapshot.firstChild) || title;\r\n        }\r\n        if (title == 'home.title') {\r\n            this.isHome = true;\r\n        }\r\n        else {\r\n            this.isHome = false;\r\n        }\r\n        console.log('home', this.isHome);\r\n        return title;\r\n    };\r\n    JhiMainComponent.prototype.ngOnInit = function () {\r\n        var _this = this;\r\n        this.router.events.subscribe(function (event) {\r\n            if (event instanceof router_1.NavigationEnd) {\r\n                _this.jhiLanguageHelper.updateTitle(_this.getPageTitle(_this.router.routerState.snapshot.root));\r\n            }\r\n        });\r\n        // force the application to look for user authentication immediately\r\n        this.principal.identity()\r\n            .then(function () {\r\n            _this.securityReady = true;\r\n        })\r\n            .catch(function () {\r\n            _this.securityReady = true;\r\n        });\r\n    };\r\n    JhiMainComponent.prototype.isAuthenticated = function () {\r\n        return this.principal.isAuthenticated();\r\n    };\r\n    JhiMainComponent = __decorate([\r\n        core_1.Component({\r\n            selector: 'jhi-main',\r\n            template: __webpack_require__(\"./src/main/webapp/app/layouts/main/main.component.html\"),\r\n            styles: [\r\n                __webpack_require__(\"./src/main/webapp/app/layouts/main/main.scss\")\r\n            ]\r\n        }),\r\n        __metadata(\"design:paramtypes\", [shared_1.Principal,\r\n            shared_1.JhiLanguageHelper,\r\n            router_1.Router])\r\n    ], JhiMainComponent);\r\n    return JhiMainComponent;\r\n}());\r\nexports.JhiMainComponent = JhiMainComponent;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL2xheW91dHMvbWFpbi9tYWluLmNvbXBvbmVudC50cz8xNjJkIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsOEVBQWtEO0FBQ2xELG9GQUFnRjtBQUVoRiw0RUFBMkQ7QUFTM0Q7SUFJSSwwQkFDWSxTQUFvQixFQUNwQixpQkFBb0MsRUFDcEMsTUFBYztRQUZkLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBTDFCLGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBTy9CLENBQUM7SUFFTyx1Q0FBWSxHQUFwQixVQUFxQixhQUFxQztRQUN0RCxJQUFJLEtBQUssR0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7UUFDOUgsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssQ0FBQztRQUNqRSxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdkIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVqQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxtQ0FBUSxHQUFSO1FBQUEsaUJBZ0JDO1FBZEcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBSztZQUMvQixFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksc0JBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNqRyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxvRUFBb0U7UUFDcEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7YUFDcEIsSUFBSSxDQUFDO1lBQ0YsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDOUIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDO1lBQ0gsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsMENBQWUsR0FBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUEvQ1EsZ0JBQWdCO1FBUDVCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQiw2QkFBYSx5REFBdUI7WUFDcEMsU0FBVztnQkFDUCxrRUFBVzthQUNkO1NBQ0osQ0FBQzt5Q0FNeUIsa0JBQVM7WUFDRCwwQkFBaUI7WUFDNUIsZUFBTTtPQVBqQixnQkFBZ0IsQ0FnRDVCO0lBQUQsdUJBQUM7Q0FBQTtBQWhEWSw0Q0FBZ0IiLCJmaWxlIjoiLi9zcmMvbWFpbi93ZWJhcHAvYXBwL2xheW91dHMvbWFpbi9tYWluLmNvbXBvbmVudC50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBKaGlMYW5ndWFnZUhlbHBlciwgUHJpbmNpcGFsfSBmcm9tICcuLi8uLi9zaGFyZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2poaS1tYWluJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbWFpbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbXG4gICAgICAgICdtYWluLnNjc3MnXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBKaGlNYWluQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHNlY3VyaXR5UmVhZHk6IEJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc0hvbWU6IGFueTtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBwcmluY2lwYWw6IFByaW5jaXBhbCxcbiAgICAgICAgcHJpdmF0ZSBqaGlMYW5ndWFnZUhlbHBlcjogSmhpTGFuZ3VhZ2VIZWxwZXIsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgICApIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBhZ2VUaXRsZShyb3V0ZVNuYXBzaG90OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KSB7XG4gICAgICAgIGxldCB0aXRsZTogc3RyaW5nID0gKHJvdXRlU25hcHNob3QuZGF0YSAmJiByb3V0ZVNuYXBzaG90LmRhdGFbJ3BhZ2VUaXRsZSddKSA/IHJvdXRlU25hcHNob3QuZGF0YVsncGFnZVRpdGxlJ10gOiAnc2Nob29sYXJBcHAnO1xuICAgICAgICBpZiAocm91dGVTbmFwc2hvdC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICB0aXRsZSA9IHRoaXMuZ2V0UGFnZVRpdGxlKHJvdXRlU25hcHNob3QuZmlyc3RDaGlsZCkgfHwgdGl0bGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGl0bGUgPT0gJ2hvbWUudGl0bGUnKSB7XG4gICAgICAgICAgICB0aGlzLmlzSG9tZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzSG9tZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdob21lJywgdGhpcy5pc0hvbWUpO1xuXG4gICAgICAgIHJldHVybiB0aXRsZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICB0aGlzLnJvdXRlci5ldmVudHMuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuamhpTGFuZ3VhZ2VIZWxwZXIudXBkYXRlVGl0bGUodGhpcy5nZXRQYWdlVGl0bGUodGhpcy5yb3V0ZXIucm91dGVyU3RhdGUuc25hcHNob3Qucm9vdCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBmb3JjZSB0aGUgYXBwbGljYXRpb24gdG8gbG9vayBmb3IgdXNlciBhdXRoZW50aWNhdGlvbiBpbW1lZGlhdGVseVxuICAgICAgICB0aGlzLnByaW5jaXBhbC5pZGVudGl0eSgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWN1cml0eVJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VjdXJpdHlSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpc0F1dGhlbnRpY2F0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByaW5jaXBhbC5pc0F1dGhlbnRpY2F0ZWQoKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9tYWluL3dlYmFwcC9hcHAvbGF5b3V0cy9tYWluL21haW4uY29tcG9uZW50LnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/main/webapp/app/layouts/main/main.component.ts\n");

/***/ })

})