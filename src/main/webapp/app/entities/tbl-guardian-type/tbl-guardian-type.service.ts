import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblGuardianType } from './tbl-guardian-type.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblGuardianTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-guardian-types';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblGuardianType: TblGuardianType): Observable<TblGuardianType> {
        const copy = this.convert(tblGuardianType);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblGuardianType: TblGuardianType): Observable<TblGuardianType> {
        const copy = this.convert(tblGuardianType);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblGuardianType> {
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
     * Convert a returned JSON object to TblGuardianType.
     */
    private convertItemFromServer(json: any): TblGuardianType {
        const entity: TblGuardianType = Object.assign(new TblGuardianType(), json);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblGuardianType to a JSON which can be sent to the server.
     */
    private convert(tblGuardianType: TblGuardianType): TblGuardianType {
        const copy: TblGuardianType = Object.assign({}, tblGuardianType);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblGuardianType.dtmLastUpdate);
        return copy;
    }
}
