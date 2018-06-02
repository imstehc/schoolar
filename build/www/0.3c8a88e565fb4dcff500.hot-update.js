webpackHotUpdate(0,{

/***/ "./src/main/webapp/app/home/home-internal/home-internal.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar core_1 = __webpack_require__(\"./node_modules/@angular/core/esm5/core.js\");\r\nvar principal_service_1 = __webpack_require__(\"./src/main/webapp/app/shared/auth/principal.service.ts\");\r\nvar router_1 = __webpack_require__(\"./node_modules/@angular/router/esm5/router.js\");\r\nvar HomeInternalComponent = /** @class */ (function () {\r\n    function HomeInternalComponent(principal, router) {\r\n        this.principal = principal;\r\n        this.router = router;\r\n    }\r\n    HomeInternalComponent.prototype.ngOnInit = function () {\r\n        var _this = this;\r\n        this.principal.identity().then(function (account) {\r\n            _this.account = account;\r\n        });\r\n        //  this.getPageTitle(this.router.routerState.snapshot.root);\r\n    };\r\n    HomeInternalComponent.prototype.isAuthenticated = function () {\r\n        return this.principal.isAuthenticated();\r\n    };\r\n    HomeInternalComponent.prototype.collapseNavbar = function () {\r\n        this.isNavbarCollapsed = true;\r\n    };\r\n    HomeInternalComponent.prototype.getPageTitle = function (routeSnapshot) {\r\n        var title = (routeSnapshot.data && routeSnapshot.data['pageTitle']);\r\n        console.log('title internal', title);\r\n        if (routeSnapshot.firstChild) {\r\n            title = this.getPageTitle(routeSnapshot.firstChild) || title;\r\n        }\r\n        if (title === 'schoolarApp.home.title' || title === 'schoolarApp') {\r\n            this.isHome = true;\r\n        }\r\n        else {\r\n            this.isHome = false;\r\n        }\r\n        console.log('home-internal', title);\r\n        return title;\r\n    };\r\n    HomeInternalComponent = __decorate([\r\n        core_1.Component({\r\n            selector: 'jhi-home-internal',\r\n            template: __webpack_require__(\"./src/main/webapp/app/home/home-internal/home-internal.component.html\"),\r\n            styles: [__webpack_require__(\"./src/main/webapp/app/home/home-internal/home-internal.scss\")]\r\n        }),\r\n        __metadata(\"design:paramtypes\", [principal_service_1.Principal,\r\n            router_1.Router])\r\n    ], HomeInternalComponent);\r\n    return HomeInternalComponent;\r\n}());\r\nexports.HomeInternalComponent = HomeInternalComponent;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL2hvbWUvaG9tZS1pbnRlcm5hbC9ob21lLWludGVybmFsLmNvbXBvbmVudC50cz8yZGMyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsOEVBQWtEO0FBQ2xELHdHQUE4RDtBQUM5RCxvRkFBK0Q7QUFPL0Q7SUFJSSwrQkFDWSxTQUFvQixFQUNwQixNQUFjO1FBRGQsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQzFCLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU87WUFDbkMsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDTCw2REFBNkQ7SUFDL0QsQ0FBQztJQUVELCtDQUFlLEdBQWY7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRUQsOENBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7SUFDbEMsQ0FBQztJQUVPLDRDQUFZLEdBQXBCLFVBQXFCLGFBQXFDO1FBQ3RELElBQUksS0FBSyxHQUFXLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMzQixLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxDQUFDO1FBQ2pFLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssd0JBQXdCLElBQUksS0FBSyxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDdkIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXBDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQXZDUSxxQkFBcUI7UUFMakMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsNkJBQWEsd0VBQWdDO1lBQzdDLFNBQVMsbUJBQUcsOERBQXFCO1NBQ2xDLENBQUM7eUNBTXlCLDZCQUFTO1lBQ1osZUFBTTtPQU5qQixxQkFBcUIsQ0F5Q2pDO0lBQUQsNEJBQUM7Q0FBQTtBQXpDWSxzREFBcUIiLCJmaWxlIjoiLi9zcmMvbWFpbi93ZWJhcHAvYXBwL2hvbWUvaG9tZS1pbnRlcm5hbC9ob21lLWludGVybmFsLmNvbXBvbmVudC50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1ByaW5jaXBhbH0gZnJvbSAnLi4vLi4vc2hhcmVkL2F1dGgvcHJpbmNpcGFsLnNlcnZpY2UnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnamhpLWhvbWUtaW50ZXJuYWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vaG9tZS1pbnRlcm5hbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydob21lLWludGVybmFsLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lSW50ZXJuYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGFjY291bnQ6IEFjY291bnQ7XG4gICAgaXNOYXZiYXJDb2xsYXBzZWQ6IGJvb2xlYW47XG4gICAgaXNIb21lOiBhbnk7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcHJpbmNpcGFsOiBQcmluY2lwYWwsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5wcmluY2lwYWwuaWRlbnRpdHkoKS50aGVuKChhY2NvdW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFjY291bnQgPSBhY2NvdW50O1xuICAgICAgICB9KTtcbiAgICAgIC8vICB0aGlzLmdldFBhZ2VUaXRsZSh0aGlzLnJvdXRlci5yb3V0ZXJTdGF0ZS5zbmFwc2hvdC5yb290KTtcbiAgICB9XG5cbiAgICBpc0F1dGhlbnRpY2F0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByaW5jaXBhbC5pc0F1dGhlbnRpY2F0ZWQoKTtcbiAgICB9XG5cbiAgICBjb2xsYXBzZU5hdmJhcigpIHtcbiAgICAgICAgdGhpcy5pc05hdmJhckNvbGxhcHNlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQYWdlVGl0bGUocm91dGVTbmFwc2hvdDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCkge1xuICAgICAgICBsZXQgdGl0bGU6IHN0cmluZyA9IChyb3V0ZVNuYXBzaG90LmRhdGEgJiYgcm91dGVTbmFwc2hvdC5kYXRhWydwYWdlVGl0bGUnXSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0aXRsZSBpbnRlcm5hbCcsIHRpdGxlKTtcbiAgICAgICAgaWYgKHJvdXRlU25hcHNob3QuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGl0bGUgPSB0aGlzLmdldFBhZ2VUaXRsZShyb3V0ZVNuYXBzaG90LmZpcnN0Q2hpbGQpIHx8IHRpdGxlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRpdGxlID09PSAnc2Nob29sYXJBcHAuaG9tZS50aXRsZScgfHwgdGl0bGUgPT09ICdzY2hvb2xhckFwcCcpIHtcbiAgICAgICAgICAgIHRoaXMuaXNIb21lID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNIb21lID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ2hvbWUtaW50ZXJuYWwnLCB0aXRsZSk7XG5cbiAgICAgICAgcmV0dXJuIHRpdGxlO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvbWFpbi93ZWJhcHAvYXBwL2hvbWUvaG9tZS1pbnRlcm5hbC9ob21lLWludGVybmFsLmNvbXBvbmVudC50cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/main/webapp/app/home/home-internal/home-internal.component.ts\n");

/***/ })

})