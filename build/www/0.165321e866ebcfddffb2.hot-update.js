webpackHotUpdate(0,{

/***/ "./src/main/webapp/app/home/home.component.html":
/***/ (function(module, exports) {

eval("module.exports = \"<div id=\\\"wrapper\\\" *ngIf=\\\"changeFlagHomeFalse()\\\"> <div class=\\\"container_warp\\\"> <div class=\\\"card jh-card\\\"> <h2 jhiTranslate=\\\"global.form.welcome\\\"></h2> <h1>Schoolar</h1> <p jhiTranslate=\\\"global.form.positivosystem\\\"> </p><p jhiTranslate=\\\"global.form.educationalpositivo\\\"></p> </div> </div> </div> <div *ngIf=\\\"changeFlagHomeTrue()\\\"><jhi-home-internal></jhi-home-internal></div> \";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL2hvbWUvaG9tZS5jb21wb25lbnQuaHRtbD8zNjE4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Ii4vc3JjL21haW4vd2ViYXBwL2FwcC9ob21lL2hvbWUuY29tcG9uZW50Lmh0bWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwid3JhcHBlclxcXCIgKm5nSWY9XFxcImNoYW5nZUZsYWdIb21lRmFsc2UoKVxcXCI+IDxkaXYgY2xhc3M9XFxcImNvbnRhaW5lcl93YXJwXFxcIj4gPGRpdiBjbGFzcz1cXFwiY2FyZCBqaC1jYXJkXFxcIj4gPGgyIGpoaVRyYW5zbGF0ZT1cXFwiZ2xvYmFsLmZvcm0ud2VsY29tZVxcXCI+PC9oMj4gPGgxPlNjaG9vbGFyPC9oMT4gPHAgamhpVHJhbnNsYXRlPVxcXCJnbG9iYWwuZm9ybS5wb3NpdGl2b3N5c3RlbVxcXCI+IDwvcD48cCBqaGlUcmFuc2xhdGU9XFxcImdsb2JhbC5mb3JtLmVkdWNhdGlvbmFscG9zaXRpdm9cXFwiPjwvcD4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4gPGRpdiAqbmdJZj1cXFwiY2hhbmdlRmxhZ0hvbWVUcnVlKClcXFwiPjxqaGktaG9tZS1pbnRlcm5hbD48L2poaS1ob21lLWludGVybmFsPjwvZGl2PiBcIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tYWluL3dlYmFwcC9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5odG1sXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9tYWluL3dlYmFwcC9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5odG1sXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/main/webapp/app/home/home.component.html\n");

/***/ }),

/***/ "./src/main/webapp/app/home/home.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar core_1 = __webpack_require__(\"./node_modules/@angular/core/esm5/core.js\");\r\nvar ng_jhipster_1 = __webpack_require__(\"./node_modules/ng-jhipster/index.js\");\r\nvar shared_1 = __webpack_require__(\"./src/main/webapp/app/shared/index.ts\");\r\nvar HomeComponent = /** @class */ (function () {\r\n    function HomeComponent(principal, eventManager) {\r\n        this.principal = principal;\r\n        this.eventManager = eventManager;\r\n    }\r\n    HomeComponent.prototype.ngOnInit = function () {\r\n        var _this = this;\r\n        this.principal.identity().then(function (account) {\r\n            _this.account = account;\r\n        });\r\n        this.registerAuthenticationSuccess();\r\n        this.isNotHome = false;\r\n    };\r\n    HomeComponent.prototype.registerAuthenticationSuccess = function () {\r\n        var _this = this;\r\n        this.eventManager.subscribe('authenticationSuccess', function (message) {\r\n            _this.principal.identity().then(function (account) {\r\n                _this.account = account;\r\n            });\r\n        });\r\n    };\r\n    HomeComponent.prototype.isAuthenticated = function () {\r\n        return this.principal.isAuthenticated();\r\n    };\r\n    HomeComponent.prototype.changeFlagHomeTrue = function () {\r\n        this.isNotHome = true;\r\n        console.log(this.isNotHome);\r\n    };\r\n    HomeComponent.prototype.changeFlagHomeFalse = function () {\r\n        this.isNotHome = false;\r\n        console.log(this.isNotHome);\r\n    };\r\n    HomeComponent = __decorate([\r\n        core_1.Component({\r\n            selector: 'jhi-home',\r\n            template: __webpack_require__(\"./src/main/webapp/app/home/home.component.html\"),\r\n            styles: [\r\n                __webpack_require__(\"./src/main/webapp/app/home/home.scss\")\r\n            ]\r\n        }),\r\n        __metadata(\"design:paramtypes\", [shared_1.Principal,\r\n            ng_jhipster_1.JhiEventManager])\r\n    ], HomeComponent);\r\n    return HomeComponent;\r\n}());\r\nexports.HomeComponent = HomeComponent;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL2hvbWUvaG9tZS5jb21wb25lbnQudHM/NjNmMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDhFQUFrRDtBQUVsRCwrRUFBOEM7QUFFOUMsNEVBQStDO0FBVS9DO0lBSUksdUJBQ1ksU0FBb0IsRUFDcEIsWUFBNkI7UUFEN0IsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixpQkFBWSxHQUFaLFlBQVksQ0FBaUI7SUFFekMsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFBQSxpQkFNQztRQUxJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsT0FBTztZQUNwQyxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFFRCxxREFBNkIsR0FBN0I7UUFBQSxpQkFNQztRQUxJLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLHVCQUF1QixFQUFFLFVBQUMsT0FBTztZQUN6RCxLQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU87Z0JBQ25DLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQsdUNBQWUsR0FBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRCwwQ0FBa0IsR0FBbEI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsMkNBQW1CLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQXRDUSxhQUFhO1FBUnpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQiw2QkFBYSxpREFBdUI7WUFDcEMsU0FBVztnQkFDUCwwREFBVzthQUNkO1NBRUosQ0FBQzt5Q0FNeUIsa0JBQVM7WUFDTiw2QkFBZTtPQU5oQyxhQUFhLENBd0N6QjtJQUFELG9CQUFDO0NBQUE7QUF4Q1ksc0NBQWEiLCJmaWxlIjoiLi9zcmMvbWFpbi93ZWJhcHAvYXBwL2hvbWUvaG9tZS5jb21wb25lbnQudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdiTW9kYWxSZWYgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBKaGlFdmVudE1hbmFnZXIgfSBmcm9tICduZy1qaGlwc3Rlcic7XG5cbmltcG9ydCB7IEFjY291bnQsIFByaW5jaXBhbCB9IGZyb20gJy4uL3NoYXJlZCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamhpLWhvbWUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9ob21lLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFtcbiAgICAgICAgJ2hvbWUuc2NzcydcbiAgICBdXG5cbn0pXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgYWNjb3VudDogQWNjb3VudDtcbiAgICBtb2RhbFJlZjogTmdiTW9kYWxSZWY7XG4gICAgaXNOb3RIb21lOiBhbnk7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcHJpbmNpcGFsOiBQcmluY2lwYWwsXG4gICAgICAgIHByaXZhdGUgZXZlbnRNYW5hZ2VyOiBKaGlFdmVudE1hbmFnZXIsXG4gICAgKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgICB0aGlzLnByaW5jaXBhbC5pZGVudGl0eSgpLnRoZW4oKGFjY291bnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWNjb3VudCA9IGFjY291bnQ7XG4gICAgICAgIH0pO1xuICAgICAgICAgdGhpcy5yZWdpc3RlckF1dGhlbnRpY2F0aW9uU3VjY2VzcygpO1xuICAgICAgICAgdGhpcy5pc05vdEhvbWUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZWdpc3RlckF1dGhlbnRpY2F0aW9uU3VjY2VzcygpIHtcbiAgICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnN1YnNjcmliZSgnYXV0aGVudGljYXRpb25TdWNjZXNzJywgKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICB0aGlzLnByaW5jaXBhbC5pZGVudGl0eSgpLnRoZW4oKGFjY291bnQpID0+IHtcbiAgICAgICAgICAgICAgICAgdGhpcy5hY2NvdW50ID0gYWNjb3VudDtcbiAgICAgICAgICAgICB9KTtcbiAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlzQXV0aGVudGljYXRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJpbmNpcGFsLmlzQXV0aGVudGljYXRlZCgpO1xuICAgIH1cblxuICAgIGNoYW5nZUZsYWdIb21lVHJ1ZSgpIHtcbiAgICAgICAgdGhpcy5pc05vdEhvbWUgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmlzTm90SG9tZSk7XG4gICAgfVxuXG4gICAgY2hhbmdlRmxhZ0hvbWVGYWxzZSgpIHtcbiAgICAgICAgdGhpcy5pc05vdEhvbWUgPSBmYWxzZTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5pc05vdEhvbWUpO1xuICAgIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvbWFpbi93ZWJhcHAvYXBwL2hvbWUvaG9tZS5jb21wb25lbnQudHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/main/webapp/app/home/home.component.ts\n");

/***/ })

})