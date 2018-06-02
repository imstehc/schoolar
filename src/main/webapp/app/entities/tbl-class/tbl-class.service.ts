import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblClass } from './tbl-class.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblClassService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-classes';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblClass: TblClass): Observable<TblClass> {
        const copy = this.convert(tblClass);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblClass: TblClass): Observable<TblClass> {
        const copy = this.convert(tblClass);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblClass> {
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
     * Convert a returned JSON object to TblClass.
     */
    private convertItemFromServer(json: any): TblClass {
        const entity: TblClass = Object.assign(new TblClass(), json);
        entity.dtmCreated = this.dateUtils
            .convertDateTimeFromServer(json.dtmCreated);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblClass to a JSON which can be sent to the server.
     */
    private convert(tblClass: TblClass): TblClass {
        const copy: TblClass = Object.assign({}, tblClass);

        copy.dtmCreated = this.dateUtils.toDate(tblClass.dtmCreated);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblClass.dtmLastUpdate);
        return copy;
    }
}
