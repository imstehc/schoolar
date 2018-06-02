import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblGeneralProcedureType } from './tbl-general-procedure-type.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblGeneralProcedureTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-general-procedure-types';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblGeneralProcedureType: TblGeneralProcedureType): Observable<TblGeneralProcedureType> {
        const copy = this.convert(tblGeneralProcedureType);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblGeneralProcedureType: TblGeneralProcedureType): Observable<TblGeneralProcedureType> {
        const copy = this.convert(tblGeneralProcedureType);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblGeneralProcedureType> {
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
     * Convert a returned JSON object to TblGeneralProcedureType.
     */
    private convertItemFromServer(json: any): TblGeneralProcedureType {
        const entity: TblGeneralProcedureType = Object.assign(new TblGeneralProcedureType(), json);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblGeneralProcedureType to a JSON which can be sent to the server.
     */
    private convert(tblGeneralProcedureType: TblGeneralProcedureType): TblGeneralProcedureType {
        const copy: TblGeneralProcedureType = Object.assign({}, tblGeneralProcedureType);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblGeneralProcedureType.dtmLastUpdate);
        return copy;
    }
}
