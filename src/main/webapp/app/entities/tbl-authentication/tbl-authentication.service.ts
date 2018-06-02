import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TblAuthentication } from './tbl-authentication.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblAuthenticationService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-authentications';

    constructor(private http: Http) { }

    create(tblAuthentication: TblAuthentication): Observable<TblAuthentication> {
        const copy = this.convert(tblAuthentication);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblAuthentication: TblAuthentication): Observable<TblAuthentication> {
        const copy = this.convert(tblAuthentication);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblAuthentication> {
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
     * Convert a returned JSON object to TblAuthentication.
     */
    private convertItemFromServer(json: any): TblAuthentication {
        const entity: TblAuthentication = Object.assign(new TblAuthentication(), json);
        return entity;
    }

    /**
     * Convert a TblAuthentication to a JSON which can be sent to the server.
     */
    private convert(tblAuthentication: TblAuthentication): TblAuthentication {
        const copy: TblAuthentication = Object.assign({}, tblAuthentication);
        return copy;
    }
}
