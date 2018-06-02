import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblLevelType } from './tbl-level-type.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblLevelTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-level-types';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblLevelType: TblLevelType): Observable<TblLevelType> {
        const copy = this.convert(tblLevelType);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblLevelType: TblLevelType): Observable<TblLevelType> {
        const copy = this.convert(tblLevelType);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblLevelType> {
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
     * Convert a returned JSON object to TblLevelType.
     */
    private convertItemFromServer(json: any): TblLevelType {
        const entity: TblLevelType = Object.assign(new TblLevelType(), json);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblLevelType to a JSON which can be sent to the server.
     */
    private convert(tblLevelType: TblLevelType): TblLevelType {
        const copy: TblLevelType = Object.assign({}, tblLevelType);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblLevelType.dtmLastUpdate);
        return copy;
    }
}
