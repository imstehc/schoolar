import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblGuardianHistory } from './tbl-guardian-history.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblGuardianHistoryService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-guardian-histories';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblGuardianHistory: TblGuardianHistory): Observable<TblGuardianHistory> {
        const copy = this.convert(tblGuardianHistory);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblGuardianHistory: TblGuardianHistory): Observable<TblGuardianHistory> {
        const copy = this.convert(tblGuardianHistory);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblGuardianHistory> {
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
     * Convert a returned JSON object to TblGuardianHistory.
     */
    private convertItemFromServer(json: any): TblGuardianHistory {
        const entity: TblGuardianHistory = Object.assign(new TblGuardianHistory(), json);
        entity.dtmChanged = this.dateUtils
            .convertDateTimeFromServer(json.dtmChanged);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblGuardianHistory to a JSON which can be sent to the server.
     */
    private convert(tblGuardianHistory: TblGuardianHistory): TblGuardianHistory {
        const copy: TblGuardianHistory = Object.assign({}, tblGuardianHistory);

        copy.dtmChanged = this.dateUtils.toDate(tblGuardianHistory.dtmChanged);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblGuardianHistory.dtmLastUpdate);
        return copy;
    }
}
