import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblLogin } from './tbl-login.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblLoginService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-logins';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblLogin: TblLogin): Observable<any> {
        const copy = this.convert(tblLogin);
        return this.http.post(this.resourceUrl, copy);
    }

    update(tblLogin: TblLogin): Observable<TblLogin> {
        const copy = this.convert(tblLogin);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblLogin> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to TblLogin.
     */
    private convertItemFromServer(json: any): TblLogin {
        const entity: TblLogin = Object.assign(new TblLogin(), json);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblLogin to a JSON which can be sent to the server.
     */
    private convert(tblLogin: TblLogin): TblLogin {
        const copy: TblLogin = Object.assign({}, tblLogin);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblLogin.dtmLastUpdate);
        return copy;
    }
}
