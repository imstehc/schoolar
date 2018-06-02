webpackHotUpdate(0,{

/***/ "./src/main/webapp/app/home/home-internal/home-internal.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar core_1 = __webpack_require__(\"./node_modules/@angular/core/esm5/core.js\");\r\nvar principal_service_1 = __webpack_require__(\"./src/main/webapp/app/shared/auth/principal.service.ts\");\r\nvar router_1 = __webpack_require__(\"./node_modules/@angular/router/esm5/router.js\");\r\nvar HomeInternalComponent = /** @class */ (function () {\r\n    function HomeInternalComponent(principal, router) {\r\n        this.principal = principal;\r\n        this.router = router;\r\n        this.isHome = false;\r\n    }\r\n    HomeInternalComponent.prototype.ngOnInit = function () {\r\n        var _this = this;\r\n        this.principal.identity().then(function (account) {\r\n            _this.account = account;\r\n        });\r\n        this.getPageTitle(this.router.routerState.snapshot.root);\r\n    };\r\n    HomeInternalComponent.prototype.isAuthenticated = function () {\r\n        return this.principal.isAuthenticated();\r\n    };\r\n    HomeInternalComponent.prototype.collapseNavbar = function () {\r\n        this.isNavbarCollapsed = true;\r\n    };\r\n    HomeInternalComponent.prototype.getPageTitle = function (routeSnapshot) {\r\n        var title = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'schoolarApp';\r\n        if (routeSnapshot.firstChild) {\r\n            title = this.getPageTitle(routeSnapshot.firstChild) || title;\r\n        }\r\n        if (title === 'home.title') {\r\n            this.isHome = true;\r\n        }\r\n        else {\r\n            this.isHome = false;\r\n        }\r\n        console.log('home-internal', title);\r\n        return title;\r\n    };\r\n    HomeInternalComponent = __decorate([\r\n        core_1.Component({\r\n            selector: 'jhi-home-internal',\r\n            template: __webpack_require__(\"./src/main/webapp/app/home/home-internal/home-internal.component.html\"),\r\n            styles: [__webpack_require__(\"./src/main/webapp/app/home/home-internal/home-internal.scss\")]\r\n        }),\r\n        __metadata(\"design:paramtypes\", [principal_service_1.Principal,\r\n            router_1.Router])\r\n    ], HomeInternalComponent);\r\n    return HomeInternalComponent;\r\n}());\r\nexports.HomeInternalComponent = HomeInternalComponent;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL2hvbWUvaG9tZS1pbnRlcm5hbC9ob21lLWludGVybmFsLmNvbXBvbmVudC50cz8yZGMyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsOEVBQWtEO0FBQ2xELHdHQUE4RDtBQUM5RCxvRkFBK0Q7QUFPL0Q7SUFJSSwrQkFDWSxTQUFvQixFQUNwQixNQUFjO1FBRGQsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU87WUFDbkMsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsK0NBQWUsR0FBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRCw4Q0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztJQUNsQyxDQUFDO0lBRU8sNENBQVksR0FBcEIsVUFBcUIsYUFBcUM7UUFDdEQsSUFBSSxLQUFLLEdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO1FBQzlILEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLENBQUM7UUFDakUsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVwQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUF2Q1EscUJBQXFCO1FBTGpDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLDZCQUFhLHdFQUFnQztZQUM3QyxTQUFTLG1CQUFHLDhEQUFxQjtTQUNsQyxDQUFDO3lDQU15Qiw2QkFBUztZQUNaLGVBQU07T0FOakIscUJBQXFCLENBeUNqQztJQUFELDRCQUFDO0NBQUE7QUF6Q1ksc0RBQXFCIiwiZmlsZSI6Ii4vc3JjL21haW4vd2ViYXBwL2FwcC9ob21lL2hvbWUtaW50ZXJuYWwvaG9tZS1pbnRlcm5hbC5jb21wb25lbnQudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtQcmluY2lwYWx9IGZyb20gJy4uLy4uL3NoYXJlZC9hdXRoL3ByaW5jaXBhbC5zZXJ2aWNlJztcbmltcG9ydCB7QWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUm91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2poaS1ob21lLWludGVybmFsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2hvbWUtaW50ZXJuYWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnaG9tZS1pbnRlcm5hbC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSG9tZUludGVybmFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBhY2NvdW50OiBBY2NvdW50O1xuICAgIGlzTmF2YmFyQ29sbGFwc2VkOiBib29sZWFuO1xuICAgIGlzSG9tZTogYW55O1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHByaW5jaXBhbDogUHJpbmNpcGFsLFxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgICAgIHRoaXMuaXNIb21lID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucHJpbmNpcGFsLmlkZW50aXR5KCkudGhlbigoYWNjb3VudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hY2NvdW50ID0gYWNjb3VudDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZ2V0UGFnZVRpdGxlKHRoaXMucm91dGVyLnJvdXRlclN0YXRlLnNuYXBzaG90LnJvb3QpO1xuICAgIH1cblxuICAgIGlzQXV0aGVudGljYXRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJpbmNpcGFsLmlzQXV0aGVudGljYXRlZCgpO1xuICAgIH1cblxuICAgIGNvbGxhcHNlTmF2YmFyKCkge1xuICAgICAgICB0aGlzLmlzTmF2YmFyQ29sbGFwc2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBhZ2VUaXRsZShyb3V0ZVNuYXBzaG90OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KSB7XG4gICAgICAgIGxldCB0aXRsZTogc3RyaW5nID0gKHJvdXRlU25hcHNob3QuZGF0YSAmJiByb3V0ZVNuYXBzaG90LmRhdGFbJ3BhZ2VUaXRsZSddKSA/IHJvdXRlU25hcHNob3QuZGF0YVsncGFnZVRpdGxlJ10gOiAnc2Nob29sYXJBcHAnO1xuICAgICAgICBpZiAocm91dGVTbmFwc2hvdC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICB0aXRsZSA9IHRoaXMuZ2V0UGFnZVRpdGxlKHJvdXRlU25hcHNob3QuZmlyc3RDaGlsZCkgfHwgdGl0bGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGl0bGUgPT09ICdob21lLnRpdGxlJykge1xuICAgICAgICAgICAgdGhpcy5pc0hvbWUgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc0hvbWUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnaG9tZS1pbnRlcm5hbCcsIHRpdGxlKTtcblxuICAgICAgICByZXR1cm4gdGl0bGU7XG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9tYWluL3dlYmFwcC9hcHAvaG9tZS9ob21lLWludGVybmFsL2hvbWUtaW50ZXJuYWwuY29tcG9uZW50LnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/main/webapp/app/home/home-internal/home-internal.component.ts\n");

/***/ })

})