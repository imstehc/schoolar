webpackHotUpdate(0,{

/***/ "./src/main/webapp/app/home/home.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar core_1 = __webpack_require__(\"./node_modules/@angular/core/esm5/core.js\");\r\nvar ng_jhipster_1 = __webpack_require__(\"./node_modules/ng-jhipster/index.js\");\r\nvar shared_1 = __webpack_require__(\"./src/main/webapp/app/shared/index.ts\");\r\nvar router_1 = __webpack_require__(\"./node_modules/@angular/router/esm5/router.js\");\r\nvar HomeComponent = /** @class */ (function () {\r\n    function HomeComponent(principal, eventManager, router) {\r\n        this.principal = principal;\r\n        this.eventManager = eventManager;\r\n        this.router = router;\r\n    }\r\n    HomeComponent.prototype.ngOnInit = function () {\r\n        var _this = this;\r\n        this.router.events.subscribe(function (event) {\r\n            if (event instanceof router_1.NavigationEnd) {\r\n                _this.getPageTitle(_this.router.routerState.snapshot.root);\r\n            }\r\n        });\r\n        this.principal.identity().then(function (account) {\r\n            _this.account = account;\r\n        });\r\n        this.registerAuthenticationSuccess();\r\n    };\r\n    HomeComponent.prototype.registerAuthenticationSuccess = function () {\r\n        var _this = this;\r\n        this.eventManager.subscribe('authenticationSuccess', function (message) {\r\n            _this.principal.identity().then(function (account) {\r\n                _this.account = account;\r\n            });\r\n        });\r\n    };\r\n    HomeComponent.prototype.isAuthenticated = function () {\r\n        return this.principal.isAuthenticated();\r\n    };\r\n    HomeComponent.prototype.getPageTitle = function (routeSnapshot) {\r\n        var title = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'schoolarApp';\r\n        if (routeSnapshot.firstChild) {\r\n            title = this.getPageTitle(routeSnapshot.firstChild) || title;\r\n        }\r\n        if (title === 'home.title' || title === 'schoolarApp') {\r\n            this.isHome = true;\r\n        }\r\n        else {\r\n            this.isHome = false;\r\n        }\r\n        console.log(this.isHome, title);\r\n        return title;\r\n    };\r\n    HomeComponent = __decorate([\r\n        core_1.Component({\r\n            selector: 'jhi-home',\r\n            template: __webpack_require__(\"./src/main/webapp/app/home/home.component.html\"),\r\n            styles: [\r\n                __webpack_require__(\"./src/main/webapp/app/home/home.scss\")\r\n            ]\r\n        }),\r\n        __metadata(\"design:paramtypes\", [shared_1.Principal,\r\n            ng_jhipster_1.JhiEventManager,\r\n            router_1.Router])\r\n    ], HomeComponent);\r\n    return HomeComponent;\r\n}());\r\nexports.HomeComponent = HomeComponent;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL2hvbWUvaG9tZS5jb21wb25lbnQudHM/NjNmMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDhFQUE0RDtBQUU1RCwrRUFBOEM7QUFFOUMsNEVBQStDO0FBQy9DLG9GQUE4RTtBQVU5RTtJQUlJLHVCQUNZLFNBQW9CLEVBQ3BCLFlBQTZCLEVBQzdCLE1BQWM7UUFGZCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLGlCQUFZLEdBQVosWUFBWSxDQUFpQjtRQUM3QixXQUFNLEdBQU4sTUFBTSxDQUFRO0lBRTFCLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQUEsaUJBVUM7UUFURyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFLO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxzQkFBYSxDQUFDLENBQUMsQ0FBQztnQkFDakMsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0QsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFPO1lBQ3BDLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELHFEQUE2QixHQUE3QjtRQUFBLGlCQU1DO1FBTEksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLEVBQUUsVUFBQyxPQUFPO1lBQ3pELEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsT0FBTztnQkFDbkMsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFRCx1Q0FBZSxHQUFmO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVPLG9DQUFZLEdBQXBCLFVBQXFCLGFBQXFDO1FBQ3RELElBQUksS0FBSyxHQUFXLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztRQUM5SCxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMzQixLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxDQUFDO1FBQ2pFLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssWUFBWSxJQUFJLEtBQUssS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBaERRLGFBQWE7UUFSekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLDZCQUFhLGlEQUF1QjtZQUNwQyxTQUFXO2dCQUNQLDBEQUFXO2FBQ2Q7U0FFSixDQUFDO3lDQU15QixrQkFBUztZQUNOLDZCQUFlO1lBQ3JCLGVBQU07T0FQakIsYUFBYSxDQWlEekI7SUFBRCxvQkFBQztDQUFBO0FBakRZLHNDQUFhIiwiZmlsZSI6Ii4vc3JjL21haW4vd2ViYXBwL2FwcC9ob21lL2hvbWUuY29tcG9uZW50LnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ2JNb2RhbFJlZiB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcbmltcG9ydCB7IEpoaUV2ZW50TWFuYWdlciB9IGZyb20gJ25nLWpoaXBzdGVyJztcblxuaW1wb3J0IHsgQWNjb3VudCwgUHJpbmNpcGFsIH0gZnJvbSAnLi4vc2hhcmVkJztcbmltcG9ydCB7QWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgTmF2aWdhdGlvbkVuZCwgUm91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamhpLWhvbWUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9ob21lLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFtcbiAgICAgICAgJ2hvbWUuc2NzcydcbiAgICBdXG5cbn0pXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgYWNjb3VudDogQWNjb3VudDtcbiAgICBtb2RhbFJlZjogTmdiTW9kYWxSZWY7XG4gICAgaXNIb21lOiBhbnk7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcHJpbmNpcGFsOiBQcmluY2lwYWwsXG4gICAgICAgIHByaXZhdGUgZXZlbnRNYW5hZ2VyOiBKaGlFdmVudE1hbmFnZXIsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcbiAgICApIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFBhZ2VUaXRsZSh0aGlzLnJvdXRlci5yb3V0ZXJTdGF0ZS5zbmFwc2hvdC5yb290KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICB0aGlzLnByaW5jaXBhbC5pZGVudGl0eSgpLnRoZW4oKGFjY291bnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWNjb3VudCA9IGFjY291bnQ7XG4gICAgICAgIH0pO1xuICAgICAgICAgdGhpcy5yZWdpc3RlckF1dGhlbnRpY2F0aW9uU3VjY2VzcygpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyQXV0aGVudGljYXRpb25TdWNjZXNzKCkge1xuICAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIuc3Vic2NyaWJlKCdhdXRoZW50aWNhdGlvblN1Y2Nlc3MnLCAobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgIHRoaXMucHJpbmNpcGFsLmlkZW50aXR5KCkudGhlbigoYWNjb3VudCkgPT4ge1xuICAgICAgICAgICAgICAgICB0aGlzLmFjY291bnQgPSBhY2NvdW50O1xuICAgICAgICAgICAgIH0pO1xuICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaXNBdXRoZW50aWNhdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmluY2lwYWwuaXNBdXRoZW50aWNhdGVkKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQYWdlVGl0bGUocm91dGVTbmFwc2hvdDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCkge1xuICAgICAgICBsZXQgdGl0bGU6IHN0cmluZyA9IChyb3V0ZVNuYXBzaG90LmRhdGEgJiYgcm91dGVTbmFwc2hvdC5kYXRhWydwYWdlVGl0bGUnXSkgPyByb3V0ZVNuYXBzaG90LmRhdGFbJ3BhZ2VUaXRsZSddIDogJ3NjaG9vbGFyQXBwJztcbiAgICAgICAgaWYgKHJvdXRlU25hcHNob3QuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGl0bGUgPSB0aGlzLmdldFBhZ2VUaXRsZShyb3V0ZVNuYXBzaG90LmZpcnN0Q2hpbGQpIHx8IHRpdGxlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRpdGxlID09PSAnaG9tZS50aXRsZScgfHwgdGl0bGUgPT09ICdzY2hvb2xhckFwcCcpIHtcbiAgICAgICAgICAgIHRoaXMuaXNIb21lID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNIb21lID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5pc0hvbWUsIHRpdGxlKTtcbiAgICAgICAgcmV0dXJuIHRpdGxlO1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL21haW4vd2ViYXBwL2FwcC9ob21lL2hvbWUuY29tcG9uZW50LnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/main/webapp/app/home/home.component.ts\n");

/***/ })

})