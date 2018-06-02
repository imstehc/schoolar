import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblGuardian } from './tbl-guardian.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblGuardianService {

    private resourceUrl = SERVER_API_URL + 'api/tbl-guardians';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblGuardian: TblGuardian): Observable<TblGuardian> {
        const copy = this.convert(tblGuardian);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblGuardian: TblGuardian): Observable<TblGuardian> {
        const copy = this.convert(tblGuardian);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblGuardian> {
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
    queryByGuardian(id: number, req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        const resourceUrl = SERVER_API_URL + 'api/tbl-guardians/dependents-by-guardian';
        return this.http.get(`${resourceUrl}/${id}`)
            .map((res: Response) => this.convertResponse(res));
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
     * Convert a returned JSON object to TblGuardian.
     */
    private convertItemFromServer(json: any): TblGuardian {
        const entity: TblGuardian = Object.assign(new TblGuardian(), json);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblGuardian to a JSON which can be sent to the server.
     */
    private convert(tblGuardian: TblGuardian): TblGuardian {
        const copy: TblGuardian = Object.assign({}, tblGuardian);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblGuardian.dtmLastUpdate);
        return copy;
    }
}
