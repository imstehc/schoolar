webpackHotUpdate(0,{

/***/ "./src/main/webapp/app/home/home.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar core_1 = __webpack_require__(\"./node_modules/@angular/core/esm5/core.js\");\r\nvar ng_jhipster_1 = __webpack_require__(\"./node_modules/ng-jhipster/index.js\");\r\nvar shared_1 = __webpack_require__(\"./src/main/webapp/app/shared/index.ts\");\r\nvar HomeComponent = /** @class */ (function () {\r\n    function HomeComponent(principal, eventManager, elem) {\r\n        this.principal = principal;\r\n        this.eventManager = eventManager;\r\n        this.elem = elem;\r\n    }\r\n    HomeComponent.prototype.ngOnInit = function () {\r\n        var _this = this;\r\n        this.principal.identity().then(function (account) {\r\n            _this.account = account;\r\n        });\r\n        this.registerAuthenticationSuccess();\r\n        this.isNotHome = true;\r\n    };\r\n    HomeComponent.prototype.registerAuthenticationSuccess = function () {\r\n        var _this = this;\r\n        this.eventManager.subscribe('authenticationSuccess', function (message) {\r\n            _this.principal.identity().then(function (account) {\r\n                _this.account = account;\r\n            });\r\n        });\r\n    };\r\n    HomeComponent.prototype.isAuthenticated = function () {\r\n        return this.principal.isAuthenticated();\r\n    };\r\n    HomeComponent = __decorate([\r\n        core_1.Component({\r\n            selector: 'jhi-home',\r\n            template: __webpack_require__(\"./src/main/webapp/app/home/home.component.html\"),\r\n            styles: [\r\n                __webpack_require__(\"./src/main/webapp/app/home/home.scss\")\r\n            ]\r\n        }),\r\n        __metadata(\"design:paramtypes\", [shared_1.Principal,\r\n            ng_jhipster_1.JhiEventManager,\r\n            core_1.ElementRef])\r\n    ], HomeComponent);\r\n    return HomeComponent;\r\n}());\r\nexports.HomeComponent = HomeComponent;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL2hvbWUvaG9tZS5jb21wb25lbnQudHM/NjNmMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDhFQUE0RDtBQUU1RCwrRUFBOEM7QUFFOUMsNEVBQStDO0FBVS9DO0lBSUksdUJBQ1ksU0FBb0IsRUFDcEIsWUFBNkIsRUFDN0IsSUFBZ0I7UUFGaEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixpQkFBWSxHQUFaLFlBQVksQ0FBaUI7UUFDN0IsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUU1QixDQUFDO0lBRUQsZ0NBQVEsR0FBUjtRQUFBLGlCQU1DO1FBTEksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFPO1lBQ3BDLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVELHFEQUE2QixHQUE3QjtRQUFBLGlCQU1DO1FBTEksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLEVBQUUsVUFBQyxPQUFPO1lBQ3pELEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsT0FBTztnQkFDbkMsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFRCx1Q0FBZSxHQUFmO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQTdCUSxhQUFhO1FBUnpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQiw2QkFBYSxpREFBdUI7WUFDcEMsU0FBVztnQkFDUCwwREFBVzthQUNkO1NBRUosQ0FBQzt5Q0FNeUIsa0JBQVM7WUFDTiw2QkFBZTtZQUN2QixpQkFBVTtPQVBuQixhQUFhLENBK0J6QjtJQUFELG9CQUFDO0NBQUE7QUEvQlksc0NBQWEiLCJmaWxlIjoiLi9zcmMvbWFpbi93ZWJhcHAvYXBwL2hvbWUvaG9tZS5jb21wb25lbnQudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nYk1vZGFsUmVmIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuaW1wb3J0IHsgSmhpRXZlbnRNYW5hZ2VyIH0gZnJvbSAnbmctamhpcHN0ZXInO1xuXG5pbXBvcnQgeyBBY2NvdW50LCBQcmluY2lwYWwgfSBmcm9tICcuLi9zaGFyZWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2poaS1ob21lJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vaG9tZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbXG4gICAgICAgICdob21lLnNjc3MnXG4gICAgXVxuXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGFjY291bnQ6IEFjY291bnQ7XG4gICAgbW9kYWxSZWY6IE5nYk1vZGFsUmVmO1xuICAgIGlzTm90SG9tZTogYW55O1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHByaW5jaXBhbDogUHJpbmNpcGFsLFxuICAgICAgICBwcml2YXRlIGV2ZW50TWFuYWdlcjogSmhpRXZlbnRNYW5hZ2VyLFxuICAgICAgICBwcml2YXRlIGVsZW06IEVsZW1lbnRSZWZcbiAgICApIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgIHRoaXMucHJpbmNpcGFsLmlkZW50aXR5KCkudGhlbigoYWNjb3VudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hY2NvdW50ID0gYWNjb3VudDtcbiAgICAgICAgfSk7XG4gICAgICAgICB0aGlzLnJlZ2lzdGVyQXV0aGVudGljYXRpb25TdWNjZXNzKCk7XG4gICAgICAgIHRoaXMuaXNOb3RIb21lID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZWdpc3RlckF1dGhlbnRpY2F0aW9uU3VjY2VzcygpIHtcbiAgICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnN1YnNjcmliZSgnYXV0aGVudGljYXRpb25TdWNjZXNzJywgKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICB0aGlzLnByaW5jaXBhbC5pZGVudGl0eSgpLnRoZW4oKGFjY291bnQpID0+IHtcbiAgICAgICAgICAgICAgICAgdGhpcy5hY2NvdW50ID0gYWNjb3VudDtcbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlzQXV0aGVudGljYXRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJpbmNpcGFsLmlzQXV0aGVudGljYXRlZCgpO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvbWFpbi93ZWJhcHAvYXBwL2hvbWUvaG9tZS5jb21wb25lbnQudHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/main/webapp/app/home/home.component.ts\n");

/***/ })

})