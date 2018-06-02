import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblSchoolHistory } from './tbl-school-history.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblSchoolHistoryService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-school-histories';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblSchoolHistory: TblSchoolHistory): Observable<TblSchoolHistory> {
        const copy = this.convert(tblSchoolHistory);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblSchoolHistory: TblSchoolHistory): Observable<TblSchoolHistory> {
        const copy = this.convert(tblSchoolHistory);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblSchoolHistory> {
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
     * Convert a returned JSON object to TblSchoolHistory.
     */
    private convertItemFromServer(json: any): TblSchoolHistory {
        const entity: TblSchoolHistory = Object.assign(new TblSchoolHistory(), json);
        entity.dtmChanged = this.dateUtils
            .convertDateTimeFromServer(json.dtmChanged);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblSchoolHistory to a JSON which can be sent to the server.
     */
    private convert(tblSchoolHistory: TblSchoolHistory): TblSchoolHistory {
        const copy: TblSchoolHistory = Object.assign({}, tblSchoolHistory);

        copy.dtmChanged = this.dateUtils.toDate(tblSchoolHistory.dtmChanged);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblSchoolHistory.dtmLastUpdate);
        return copy;
    }
}
