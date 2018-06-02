import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblSchoolType } from './tbl-school-type.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblSchoolTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-school-types';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblSchoolType: TblSchoolType): Observable<TblSchoolType> {
        const copy = this.convert(tblSchoolType);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblSchoolType: TblSchoolType): Observable<TblSchoolType> {
        const copy = this.convert(tblSchoolType);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblSchoolType> {
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
     * Convert a returned JSON object to TblSchoolType.
     */
    private convertItemFromServer(json: any): TblSchoolType {
        const entity: TblSchoolType = Object.assign(new TblSchoolType(), json);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblSchoolType to a JSON which can be sent to the server.
     */
    private convert(tblSchoolType: TblSchoolType): TblSchoolType {
        const copy: TblSchoolType = Object.assign({}, tblSchoolType);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblSchoolType.dtmLastUpdate);
        return copy;
    }
}
