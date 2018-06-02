webpackHotUpdate(0,{

/***/ "./src/main/webapp/app/shared/alert/alert-error.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar core_1 = __webpack_require__(\"./node_modules/@angular/core/esm5/core.js\");\r\nvar core_2 = __webpack_require__(\"./node_modules/@ngx-translate/core/index.js\");\r\nvar ng_jhipster_1 = __webpack_require__(\"./node_modules/ng-jhipster/index.js\");\r\nvar JhiAlertErrorComponent = /** @class */ (function () {\r\n    // tslint:disable-next-line: no-unused-variable\r\n    function JhiAlertErrorComponent(alertService, eventManager, translateService) {\r\n        var _this = this;\r\n        this.alertService = alertService;\r\n        this.eventManager = eventManager;\r\n        this.translateService = translateService;\r\n        this.alerts = [];\r\n        this.cleanHttpErrorListener = eventManager.subscribe('schoolarApp.httpError', function (response) {\r\n            var i;\r\n            var httpResponse = response.content;\r\n            switch (httpResponse.status) {\r\n                // connection refused, server not reachable\r\n                case 0:\r\n                    _this.addErrorAlert('Server not reachable', 'error.server.not.reachable');\r\n                    break;\r\n                case 400:\r\n                    var arr = Array.from(httpResponse.headers._headers);\r\n                    var headers = [];\r\n                    for (i = 0; i < arr.length; i++) {\r\n                        if (arr[i][0].endsWith('app-error') || arr[i][0].endsWith('app-params')) {\r\n                            headers.push(arr[i][0]);\r\n                        }\r\n                    }\r\n                    headers.sort();\r\n                    var errorHeader = null;\r\n                    var entityKey = null;\r\n                    if (headers.length > 1) {\r\n                        errorHeader = httpResponse.headers.get(headers[0]);\r\n                        entityKey = httpResponse.headers.get(headers[1]);\r\n                    }\r\n                    if (errorHeader) {\r\n                        var entityName = translateService.instant('global.menu.entities.' + entityKey);\r\n                        _this.addErrorAlert(errorHeader, errorHeader, { entityName: entityName });\r\n                    }\r\n                    else if (httpResponse.text() !== '' && httpResponse.json() && httpResponse.json().fieldErrors) {\r\n                        var fieldErrors = httpResponse.json().fieldErrors;\r\n                        for (i = 0; i < fieldErrors.length; i++) {\r\n                            var fieldError = fieldErrors[i];\r\n                            // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it\r\n                            var convertedField = fieldError.field.replace(/\\[\\d*\\]/g, '[]');\r\n                            var fieldName = translateService.instant('schoolarApp.' +\r\n                                fieldError.objectName + '.' + convertedField);\r\n                            _this.addErrorAlert('Error on field \"' + fieldName + '\"', 'error.' + fieldError.message, { fieldName: fieldName });\r\n                        }\r\n                    }\r\n                    else if (httpResponse.text() !== '' && httpResponse.json() && httpResponse.json().message) {\r\n                        _this.addErrorAlert(httpResponse.json().message, httpResponse.json().message, httpResponse.json().params);\r\n                    }\r\n                    else {\r\n                        _this.addErrorAlert(httpResponse.text());\r\n                    }\r\n                    break;\r\n                case 404:\r\n                    _this.addErrorAlert('Not found', 'error.url.not.found');\r\n                    break;\r\n                case 500:\r\n                    if (httpResponse.detail.match('unique_str_cpf')) {\r\n                    }\r\n                default:\r\n                    if (httpResponse.text() !== '' && httpResponse.json() && httpResponse.json().message) {\r\n                        _this.addErrorAlert(httpResponse.json().message);\r\n                    }\r\n                    else {\r\n                        _this.addErrorAlert(httpResponse.text());\r\n                    }\r\n            }\r\n        });\r\n    }\r\n    JhiAlertErrorComponent.prototype.ngOnDestroy = function () {\r\n        if (this.cleanHttpErrorListener !== undefined && this.cleanHttpErrorListener !== null) {\r\n            this.eventManager.destroy(this.cleanHttpErrorListener);\r\n            this.alerts = [];\r\n        }\r\n    };\r\n    JhiAlertErrorComponent.prototype.addErrorAlert = function (message, key, data) {\r\n        key = (key && key !== null) ? key : message;\r\n        this.alerts.push(this.alertService.addAlert({\r\n            type: 'danger',\r\n            msg: key,\r\n            params: data,\r\n            timeout: 5000,\r\n            toast: this.alertService.isToast(),\r\n            scoped: true\r\n        }, this.alerts));\r\n    };\r\n    JhiAlertErrorComponent = __decorate([\r\n        core_1.Component({\r\n            selector: 'jhi-alert-error',\r\n            template: \"\\n        <div class=\\\"alerts\\\" role=\\\"alert\\\">\\n            <div *ngFor=\\\"let alert of alerts\\\"  [ngClass]=\\\"{'alert.position': true, 'toast': alert.toast}\\\">\\n                <ngb-alert *ngIf=\\\"alert && alert.type && alert.msg\\\" [type]=\\\"alert.type\\\" (close)=\\\"alert.close(alerts)\\\">\\n                    <pre [innerHTML]=\\\"alert.msg\\\"></pre>\\n                </ngb-alert>\\n            </div>\\n        </div>\"\r\n        }),\r\n        __metadata(\"design:paramtypes\", [ng_jhipster_1.JhiAlertService, ng_jhipster_1.JhiEventManager, core_2.TranslateService])\r\n    ], JhiAlertErrorComponent);\r\n    return JhiAlertErrorComponent;\r\n}());\r\nexports.JhiAlertErrorComponent = JhiAlertErrorComponent;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi93ZWJhcHAvYXBwL3NoYXJlZC9hbGVydC9hbGVydC1lcnJvci5jb21wb25lbnQudHM/ZjUyYSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDhFQUFxRDtBQUNyRCxnRkFBdUQ7QUFDdkQsK0VBQStEO0FBYy9EO0lBSUksK0NBQStDO0lBQy9DLGdDQUFvQixZQUE2QixFQUFVLFlBQTZCLEVBQVUsZ0JBQWtDO1FBQXBJLGlCQWdFQztRQWhFbUIsaUJBQVksR0FBWixZQUFZLENBQWlCO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWlCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNoSSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsRUFBRSxVQUFDLFFBQVE7WUFDbkYsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMxQiwyQ0FBMkM7Z0JBQzNDLEtBQUssQ0FBQztvQkFDRixLQUFJLENBQUMsYUFBYSxDQUFDLHNCQUFzQixFQUFFLDRCQUE0QixDQUFDLENBQUM7b0JBQ3pFLEtBQUssQ0FBQztnQkFFVixLQUFLLEdBQUc7b0JBQ0osSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN0RCxJQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7b0JBQ25CLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDOUIsRUFBRSxDQUFDLENBQUMsR0FBRyxD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O1FBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUN0QjtZQUNJLElBQUksRUFBRSxRQUFRO1lBQ2QsR0FBRyxFQUFFLEdBQUc7WUFDUixNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRSxJQUFJO1lBQ2IsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFO1lBQ2xDLE1BQU0sRUFBRSxJQUFJO1NBQ2YsRUFDRCxJQUFJLENBQUMsTUFBTSxDQUNkLENBQ0osQ0FBQztJQUNOLENBQUM7SUE3RlEsc0JBQXNCO1FBWGxDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFFBQVEsRUFBRSw0WkFPQztTQUNkLENBQUM7eUNBTW9DLDZCQUFlLEVBQXdCLDZCQUFlLEVBQTRCLHVCQUFnQjtPQUwzSCxzQkFBc0IsQ0E4RmxDO0lBQUQsNkJBQUM7Q0FBQTtBQTlGWSx3REFBc0IiLCJmaWxlIjoiLi9zcmMvbWFpbi93ZWJhcHAvYXBwL3NoYXJlZC9hbGVydC9hbGVydC1lcnJvci5jb21wb25lbnQudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgSmhpRXZlbnRNYW5hZ2VyLCBKaGlBbGVydFNlcnZpY2UgfSBmcm9tICduZy1qaGlwc3Rlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnamhpLWFsZXJ0LWVycm9yJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWxlcnRzXCIgcm9sZT1cImFsZXJ0XCI+XG4gICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBhbGVydCBvZiBhbGVydHNcIiAgW25nQ2xhc3NdPVwie1xcJ2FsZXJ0LnBvc2l0aW9uXFwnOiB0cnVlLCBcXCd0b2FzdFxcJzogYWxlcnQudG9hc3R9XCI+XG4gICAgICAgICAgICAgICAgPG5nYi1hbGVydCAqbmdJZj1cImFsZXJ0ICYmIGFsZXJ0LnR5cGUgJiYgYWxlcnQubXNnXCIgW3R5cGVdPVwiYWxlcnQudHlwZVwiIChjbG9zZSk9XCJhbGVydC5jbG9zZShhbGVydHMpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwcmUgW2lubmVySFRNTF09XCJhbGVydC5tc2dcIj48L3ByZT5cbiAgICAgICAgICAgICAgICA8L25nYi1hbGVydD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIEpoaUFsZXJ0RXJyb3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgYWxlcnRzOiBhbnlbXTtcbiAgICBjbGVhbkh0dHBFcnJvckxpc3RlbmVyOiBTdWJzY3JpcHRpb247XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bnVzZWQtdmFyaWFibGVcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFsZXJ0U2VydmljZTogSmhpQWxlcnRTZXJ2aWNlLCBwcml2YXRlIGV2ZW50TWFuYWdlcjogSmhpRXZlbnRNYW5hZ2VyLCBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5hbGVydHMgPSBbXTtcblxuICAgICAgICB0aGlzLmNsZWFuSHR0cEVycm9yTGlzdGVuZXIgPSBldmVudE1hbmFnZXIuc3Vic2NyaWJlKCdzY2hvb2xhckFwcC5odHRwRXJyb3InLCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGxldCBpO1xuICAgICAgICAgICAgY29uc3QgaHR0cFJlc3BvbnNlID0gcmVzcG9uc2UuY29udGVudDtcbiAgICAgICAgICAgIHN3aXRjaCAoaHR0cFJlc3BvbnNlLnN0YXR1cykge1xuICAgICAgICAgICAgICAgIC8vIGNvbm5lY3Rpb24gcmVmdXNlZCwgc2VydmVyIG5vdCByZWFjaGFibGVcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JBbGVydCgnU2VydmVyIG5vdCByZWFjaGFibGUnLCAnZXJyb3Iuc2VydmVyLm5vdC5yZWFjaGFibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDQwMDpcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyID0gQXJyYXkuZnJvbShodHRwUmVzcG9uc2UuaGVhZGVycy5faGVhZGVycyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFycltpXVswXS5lbmRzV2l0aCgnYXBwLWVycm9yJykgfHwgYXJyW2ldWzBdLmVuZHNXaXRoKCdhcHAtcGFyYW1zJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzLnB1c2goYXJyW2ldWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzLnNvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVycm9ySGVhZGVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVudGl0eUtleSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChoZWFkZXJzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ySGVhZGVyID0gaHR0cFJlc3BvbnNlLmhlYWRlcnMuZ2V0KGhlYWRlcnNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5S2V5ID0gaHR0cFJlc3BvbnNlLmhlYWRlcnMuZ2V0KGhlYWRlcnNbMV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvckhlYWRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZW50aXR5TmFtZSA9IHRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnZ2xvYmFsLm1lbnUuZW50aXRpZXMuJyArIGVudGl0eUtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yQWxlcnQoZXJyb3JIZWFkZXIsIGVycm9ySGVhZGVyLCB7IGVudGl0eU5hbWUgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaHR0cFJlc3BvbnNlLnRleHQoKSAhPT0gJycgJiYgaHR0cFJlc3BvbnNlLmpzb24oKSAmJiBodHRwUmVzcG9uc2UuanNvbigpLmZpZWxkRXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWVsZEVycm9ycyA9IGh0dHBSZXNwb25zZS5qc29uKCkuZmllbGRFcnJvcnM7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZmllbGRFcnJvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWVsZEVycm9yID0gZmllbGRFcnJvcnNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCAnc29tZXRoaW5nWzE0XS5vdGhlcls0XS5pZCcgdG8gJ3NvbWV0aGluZ1tdLm90aGVyW10uaWQnIHNvIHRyYW5zbGF0aW9ucyBjYW4gYmUgd3JpdHRlbiB0byBpdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbnZlcnRlZEZpZWxkID0gZmllbGRFcnJvci5maWVsZC5yZXBsYWNlKC9cXFtcXGQqXFxdL2csICdbXScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IHRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnc2Nob29sYXJBcHAuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkRXJyb3Iub2JqZWN0TmFtZSArICcuJyArIGNvbnZlcnRlZEZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yQWxlcnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFcnJvciBvbiBmaWVsZCBcIicgKyBmaWVsZE5hbWUgKyAnXCInLCAnZXJyb3IuJyArIGZpZWxkRXJyb3IubWVzc2FnZSwgeyBmaWVsZE5hbWUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaHR0cFJlc3BvbnNlLnRleHQoKSAhPT0gJycgJiYgaHR0cFJlc3BvbnNlLmpzb24oKSAmJiBodHRwUmVzcG9uc2UuanNvbigpLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JBbGVydChodHRwUmVzcG9uc2UuanNvbigpLm1lc3NhZ2UsIGh0dHBSZXNwb25zZS5qc29uKCkubWVzc2FnZSwgaHR0cFJlc3BvbnNlLmpzb24oKS5wYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvckFsZXJ0KGh0dHBSZXNwb25zZS50ZXh0KCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSA0MDQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JBbGVydCgnTm90IGZvdW5kJywgJ2Vycm9yLnVybC5ub3QuZm91bmQnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA1MDA6XG4gICAgICAgICAgICAgICAgICAgIGlmIChodHRwUmVzcG9uc2UuZGV0YWlsLm1hdGNoKCd1bmlxdWVfc3RyX2NwZicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGh0dHBSZXNwb25zZS50ZXh0KCkgIT09ICcnICYmIGh0dHBSZXNwb25zZS5qc29uKCkgJiYgaHR0cFJlc3BvbnNlLmpzb24oKS5tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yQWxlcnQoaHR0cFJlc3BvbnNlLmpzb24oKS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3JBbGVydChodHRwUmVzcG9uc2UudGV4dCgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xlYW5IdHRwRXJyb3JMaXN0ZW5lciAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY2xlYW5IdHRwRXJyb3JMaXN0ZW5lciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIuZGVzdHJveSh0aGlzLmNsZWFuSHR0cEVycm9yTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5hbGVydHMgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZEVycm9yQWxlcnQobWVzc2FnZSwga2V5PywgZGF0YT8pIHtcbiAgICAgICAga2V5ID0gKGtleSAmJiBrZXkgIT09IG51bGwpID8ga2V5IDogbWVzc2FnZTtcbiAgICAgICAgdGhpcy5hbGVydHMucHVzaChcbiAgICAgICAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLmFkZEFsZXJ0KFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICAgICAgICAgIG1zZzoga2V5LFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDUwMDAsXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0OiB0aGlzLmFsZXJ0U2VydmljZS5pc1RvYXN0KCksXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGhpcy5hbGVydHNcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9tYWluL3dlYmFwcC9hcHAvc2hhcmVkL2FsZXJ0L2FsZXJ0LWVycm9yLmNvbXBvbmVudC50cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/main/webapp/app/shared/alert/alert-error.component.ts\n");

/***/ })

})