webpackHotUpdate(0,{

/***/ "./src/main/webapp/app/shared/alert/alert-error.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar core_1 = __webpack_require__(\"./node_modules/@angular/core/esm5/core.js\");\r\nvar core_2 = __webpack_require__(\"./node_modules/@ngx-translate/core/index.js\");\r\nvar ng_jhipster_1 = __webpack_require__(\"./node_modules/ng-jhipster/index.js\");\r\nvar JhiAlertErrorComponent = /** @class */ (function () {\r\n    // tslint:disable-next-line: no-unused-variable\r\n    function JhiAlertErrorComponent(alertService, eventManager, translateService) {\r\n        var _this = this;\r\n        this.alertService = alertService;\r\n        this.eventManager = eventManager;\r\n        this.translateService = translateService;\r\n        this.alerts = [];\r\n        this.cleanHttpErrorListener = eventManager.subscribe('schoolarApp.httpError', function (response) {\r\n            var i;\r\n            var httpResponse = response.content;\r\n            switch (httpResponse.status) {\r\n                // connection refused, server not reachable\r\n                case 0:\r\n                    _this.addErrorAlert('Server not reachable', 'error.server.not.reachable');\r\n                    break;\r\n                case 400:\r\n                    var arr = Array.from(httpResponse.headers._headers);\r\n                    var headers = [];\r\n                    for (i = 0; i < arr.length; i++) {\r\n                        if (arr[i][0].endsWith('app-error') || arr[i][0].endsWith('app-params')) {\r\n                            headers.push(arr[i][0]);\r\n                        }\r\n                    }\r\n                    headers.sort();\r\n                    var errorHeader = null;\r\n                    var entityKey = null;\r\n                    if (headers.length > 1) {\r\n                        errorHeader = httpResponse.headers.get(headers[0]);\r\n                        entityKey = httpResponse.headers.get(headers[1]);\r\n                    }\r\n                    if (errorHeader) {\r\n                        var entityName = translateService.instant('global.menu.entities.' + entityKey);\r\n                        _this.addErrorAlert(errorHeader, errorHeader, { entityName: entityName });\r\n                    }\r\n                    else if (httpResponse.text() !== '' && httpResponse.json() && httpResponse.json().fieldErrors) {\r\n                        var fieldErrors = httpResponse.json().fieldErrors;\r\n                        for (i = 0; i < fieldErrors.length; i++) {\r\n                            var fieldError = fieldErrors[i];\r\n                            // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it\r\n                            var convertedField = fieldError.field.replace(/\\[\\d*\\]/g, '[]');\r\n                            var fieldName = translateService.instant('schoolarApp.' +\r\n                                fieldError.objectName + '.' + convertedField);\r\n                            _this.addErrorAlert('Error on field \"' + fieldName + '\"', 'error.' + fieldError.message, { fieldName: fieldName });\r\n                        }\r\n                    }\r\n                    else if (httpResponse.text() !== '' && httpResponse.json() && httpResponse.json().message) {\r\n                        _this.addErrorAlert(httpResponse.json().message, httpResponse.json().message, httpResponse.json().params);\r\n                    }\r\n                    else {\r\n                        _this.addErrorAlert(httpResponse.text());\r\n                    }\r\n                    break;\r\n                case 404:\r\n                    _this.addErrorAlert('Not found', 'error.url.not.found');\r\n                    break;\r\n                default:\r\n                    if (httpResponse.text() !== '' && httpResponse.json() && httpResponse.json().message) {\r\n                        _this.addErrorAlert(httpResponse.json().message);\r\n                    }\r\n                    else {\r\n                        _this.addErrorAlert(httpResponse.text());\r\n                    }\r\n            }\r\n        });\r\n    }\r\n    JhiAlertErrorComponent.prototype.ngOnDestroy = function () {\r\n        if (this.cleanHttpErrorListener !== undefined && this.cleanHttpErrorListener !== null) {\r\n            this.eventManager.destroy(this.cleanHttpErrorListener);\r\n            this.alerts = [];\r\n        }\r\n    };\r\n    JhiAlertErrorComponent.prototype.addErrorAlert = function (message, key, data) {\r\n        key = (key && key !== null) ? key : message;\r\n        this.alerts.push(this.alertService.addAlert({\r\n            type: 'danger',\r\n            msg: key,\r\n            params: data,\r\n            timeout: 5000,\r\n            toast: this.alertService.isToast(),\r\n            scoped: true\r\n        }, this.alerts));\r\n    };\r\n    JhiAlertErrorComponent = __decorate([\r\n        core_1.Component({\r\n            selector: 'jhi-alert-error',\r\n            template: \"\\n        <div class=\\\"alerts\\\" role=\\\"alert\\\">\\n            <div *ngFor=\\\"let alert of alerts\\\"  [ngClass]=\\\"{'alert.position': true, 'toast': alert.toast}\\\">\\n                <ngb-alert *ngIf=\\\"alert && alert.type && alert.msg\\\" [type]=\\\"alert.type\\\" (close)=\\\"alert.close(alerts)\\\">\\n                    <pre [innerHTML]=\\\"alert.msg\\\"></pre>\\n                </ngb-alert>\\n            </div>\\n        </div>\"\r\n        }),\r\n        __metadata(\"design:paramtypes\", [ng_jhipster_1.JhiAlertService, ng_jhipster_1.JhiEventManager, core_2.TranslateService])\r\n    ], JhiAlertErrorComponent);\r\n    return JhiAlertErrorComponent;\r\n}());\r\nexports.JhiAlertErrorComponent = JhiAlertErrorComponent;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL3NoYXJlZC9hbGVydC9hbGVydC1lcnJvci5jb21wb25lbnQudHM/ZjUyYSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDhFQUFxRDtBQUNyRCxnRkFBdUQ7QUFDdkQsK0VBQStEO0FBYy9EO0lBSUksK0NBQStDO0lBQy9DLGdDQUFvQixZQUE2QixFQUFVLFlBQTZCLEVBQVUsZ0JBQWtDO1FBQXBJLGlCQTREQztRQTVEbUIsaUJBQVksR0FBWixZQUFZLENBQWlCO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWlCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNoSSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsRUFBRSxVQUFDLFFBQVE7WUFDbkYsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMxQiwyQ0FBMkM7Z0JBQzNDLEtBQUssQ0FBQztvQkFDRixLQUFJLENBQUMsYUFBYSxDQUFDLHNCQUFzQixFQUFFLDRCQUE0QixDQUFDLENBQUM7b0JBQ3pFLEtBQUssQ0FBQztnQkFFVixLQUFLLEdBQUc7b0JBQ0osSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN0RCxJQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7b0JBQ25CLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDOUIsRUFBRSxDQUFDLENBQUMsR0FBRyxD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RztZQUNSLE1BQU0sRUFBRSxJQUFJO1lBQ1osT0FBTyxFQUFFLElBQUk7WUFDYixLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUU7WUFDbEMsTUFBTSxFQUFFLElBQUk7U0FDZixFQUNELElBQUksQ0FBQyxNQUFNLENBQ2QsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQXpGUSxzQkFBc0I7UUFYbEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsUUFBUSxFQUFFLDRaQU9DO1NBQ2QsQ0FBQzt5Q0FNb0MsNkJBQWUsRUFBd0IsNkJBQWUsRUFBNEIsdUJBQWdCO09BTDNILHNCQUFzQixDQTBGbEM7SUFBRCw2QkFBQztDQUFBO0FBMUZZLHdEQUFzQiIsImZpbGUiOiIuL3NyYy9tYWluL3dlYmFwcC9hcHAvc2hhcmVkL2FsZXJ0L2FsZXJ0LWVycm9yLmNvbXBvbmVudC50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBKaGlFdmVudE1hbmFnZXIsIEpoaUFsZXJ0U2VydmljZSB9IGZyb20gJ25nLWpoaXBzdGVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdqaGktYWxlcnQtZXJyb3InLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbGVydHNcIiByb2xlPVwiYWxlcnRcIj5cbiAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGFsZXJ0IG9mIGFsZXJ0c1wiICBbbmdDbGFzc109XCJ7XFwnYWxlcnQucG9zaXRpb25cXCc6IHRydWUsIFxcJ3RvYXN0XFwnOiBhbGVydC50b2FzdH1cIj5cbiAgICAgICAgICAgICAgICA8bmdiLWFsZXJ0ICpuZ0lmPVwiYWxlcnQgJiYgYWxlcnQudHlwZSAmJiBhbGVydC5tc2dcIiBbdHlwZV09XCJhbGVydC50eXBlXCIgKGNsb3NlKT1cImFsZXJ0LmNsb3NlKGFsZXJ0cylcIj5cbiAgICAgICAgICAgICAgICAgICAgPHByZSBbaW5uZXJIVE1MXT1cImFsZXJ0Lm1zZ1wiPjwvcHJlPlxuICAgICAgICAgICAgICAgIDwvbmdiLWFsZXJ0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgSmhpQWxlcnRFcnJvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBhbGVydHM6IGFueVtdO1xuICAgIGNsZWFuSHR0cEVycm9yTGlzdGVuZXI6IFN1YnNjcmlwdGlvbjtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVudXNlZC12YXJpYWJsZVxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYWxlcnRTZXJ2aWNlOiBKaGlBbGVydFNlcnZpY2UsIHByaXZhdGUgZXZlbnRNYW5hZ2VyOiBKaGlFdmVudE1hbmFnZXIsIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSkge1xuICAgICAgICB0aGlzLmFsZXJ0cyA9IFtdO1xuXG4gICAgICAgIHRoaXMuY2xlYW5IdHRwRXJyb3JMaXN0ZW5lciA9IGV2ZW50TWFuYWdlci5zdWJzY3JpYmUoJ3NjaG9vbGFyQXBwLmh0dHBFcnJvcicsIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGk7XG4gICAgICAgICAgICBjb25zdCBodHRwUmVzcG9uc2UgPSByZXNwb25zZS5jb250ZW50O1xuICAgICAgICAgICAgc3dpdGNoIChodHRwUmVzcG9uc2Uuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgLy8gY29ubmVjdGlvbiByZWZ1c2VkLCBzZXJ2ZXIgbm90IHJlYWNoYWJsZVxuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvckFsZXJ0KCdTZXJ2ZXIgbm90IHJlYWNoYWJsZScsICdlcnJvci5zZXJ2ZXIubm90LnJlYWNoYWJsZScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgNDAwOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnIgPSBBcnJheS5mcm9tKGh0dHBSZXNwb25zZS5oZWFkZXJzLl9oZWFkZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGVycyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyW2ldWzBdLmVuZHNXaXRoKCdhcHAtZXJyb3InKSB8fCBhcnJbaV1bMF0uZW5kc1dpdGgoJ2FwcC1wYXJhbXMnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnMucHVzaChhcnJbaV1bMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnMuc29ydCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXJyb3JIZWFkZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW50aXR5S2V5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhlYWRlcnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JIZWFkZXIgPSBodHRwUmVzcG9uc2UuaGVhZGVycy5nZXQoaGVhZGVyc1swXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHlLZXkgPSBodHRwUmVzcG9uc2UuaGVhZGVycy5nZXQoaGVhZGVyc1sxXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9ySGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRpdHlOYW1lID0gdHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdnbG9iYWwubWVudS5lbnRpdGllcy4nICsgZW50aXR5S2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JBbGVydChlcnJvckhlYWRlciwgZXJyb3JIZWFkZXIsIHsgZW50aXR5TmFtZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChodHRwUmVzcG9uc2UudGV4dCgpICE9PSAnJyAmJiBodHRwUmVzcG9uc2UuanNvbigpICYmIGh0dHBSZXNwb25zZS5qc29uKCkuZmllbGRFcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkRXJyb3JzID0gaHR0cFJlc3BvbnNlLmpzb24oKS5maWVsZEVycm9ycztcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBmaWVsZEVycm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkRXJyb3IgPSBmaWVsZEVycm9yc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0ICdzb21ldGhpbmdbMTRdLm90aGVyWzRdLmlkJyB0byAnc29tZXRoaW5nW10ub3RoZXJbXS5pZCcgc28gdHJhbnNsYXRpb25zIGNhbiBiZSB3cml0dGVuIHRvIGl0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udmVydGVkRmllbGQgPSBmaWVsZEVycm9yLmZpZWxkLnJlcGxhY2UoL1xcW1xcZCpcXF0vZywgJ1tdJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmllbGROYW1lID0gdHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdzY2hvb2xhckFwcC4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFcnJvci5vYmplY3ROYW1lICsgJy4nICsgY29udmVydGVkRmllbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JBbGVydChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0Vycm9yIG9uIGZpZWxkIFwiJyArIGZpZWxkTmFtZSArICdcIicsICdlcnJvci4nICsgZmllbGRFcnJvci5tZXNzYWdlLCB7IGZpZWxkTmFtZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChodHRwUmVzcG9uc2UudGV4dCgpICE9PSAnJyAmJiBodHRwUmVzcG9uc2UuanNvbigpICYmIGh0dHBSZXNwb25zZS5qc29uKCkubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvckFsZXJ0KGh0dHBSZXNwb25zZS5qc29uKCkubWVzc2FnZSwgaHR0cFJlc3BvbnNlLmpzb24oKS5tZXNzYWdlLCBodHRwUmVzcG9uc2UuanNvbigpLnBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yQWxlcnQoaHR0cFJlc3BvbnNlLnRleHQoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDQwNDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvckFsZXJ0KCdOb3QgZm91bmQnLCAnZXJyb3IudXJsLm5vdC5mb3VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmIChodHRwUmVzcG9uc2UudGV4dCgpICE9PSAnJyAmJiBodHRwUmVzcG9uc2UuanNvbigpICYmIGh0dHBSZXNwb25zZS5qc29uKCkubWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvckFsZXJ0KGh0dHBSZXNwb25zZS5qc29uKCkubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yQWxlcnQoaHR0cFJlc3BvbnNlLnRleHQoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmNsZWFuSHR0cEVycm9yTGlzdGVuZXIgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNsZWFuSHR0cEVycm9yTGlzdGVuZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLmRlc3Ryb3kodGhpcy5jbGVhbkh0dHBFcnJvckxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuYWxlcnRzID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRFcnJvckFsZXJ0KG1lc3NhZ2UsIGtleT8sIGRhdGE/KSB7XG4gICAgICAgIGtleSA9IChrZXkgJiYga2V5ICE9PSBudWxsKSA/IGtleSA6IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuYWxlcnRzLnB1c2goXG4gICAgICAgICAgICB0aGlzLmFsZXJ0U2VydmljZS5hZGRBbGVydChcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICAgICAgICBtc2c6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiA1MDAwLFxuICAgICAgICAgICAgICAgICAgICB0b2FzdDogdGhpcy5hbGVydFNlcnZpY2UuaXNUb2FzdCgpLFxuICAgICAgICAgICAgICAgICAgICBzY29wZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRoaXMuYWxlcnRzXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvbWFpbi93ZWJhcHAvYXBwL3NoYXJlZC9hbGVydC9hbGVydC1lcnJvci5jb21wb25lbnQudHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/main/webapp/app/shared/alert/alert-error.component.ts\n");

/***/ })

})