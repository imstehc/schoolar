import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblPhone } from './tbl-phone.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblPhoneService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-phones';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblPhone: TblPhone): Observable<TblPhone> {
        const copy = this.convert(tblPhone);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblPhone: TblPhone): Observable<TblPhone> {
        const copy = this.convert(tblPhone);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblPhone> {
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
     * Convert a returned JSON object to TblPhone.
     */
    private convertItemFromServer(json: any): TblPhone {
        const entity: TblPhone = Object.assign(new TblPhone(), json);
        entity.dtmCreated = this.dateUtils
            .convertDateTimeFromServer(json.dtmCreated);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblPhone to a JSON which can be sent to the server.
     */
    private convert(tblPhone: TblPhone): TblPhone {
        const copy: TblPhone = Object.assign({}, tblPhone);

        copy.dtmCreated = this.dateUtils.toDate(tblPhone.dtmCreated);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblPhone.dtmLastUpdate);
        return copy;
    }
}
