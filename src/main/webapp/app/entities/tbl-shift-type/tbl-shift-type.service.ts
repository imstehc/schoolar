import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblShiftType } from './tbl-shift-type.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblShiftTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-shift-types';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblShiftType: TblShiftType): Observable<TblShiftType> {
        const copy = this.convert(tblShiftType);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblShiftType: TblShiftType): Observable<TblShiftType> {
        const copy = this.convert(tblShiftType);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblShiftType> {
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
     * Convert a returned JSON object to TblShiftType.
     */
    private convertItemFromServer(json: any): TblShiftType {
        const entity: TblShiftType = Object.assign(new TblShiftType(), json);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblShiftType to a JSON which can be sent to the server.
     */
    private convert(tblShiftType: TblShiftType): TblShiftType {
        const copy: TblShiftType = Object.assign({}, tblShiftType);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblShiftType.dtmLastUpdate);
        return copy;
    }
}
