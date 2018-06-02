import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblSchoolNetworkSchool } from './tbl-school-network-school.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblSchoolNetworkSchoolService {

    private resourceUrl = SERVER_API_URL + 'api/tbl-school-network-schools';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblSchoolNetworkSchool: TblSchoolNetworkSchool): Observable<TblSchoolNetworkSchool> {
        const copy = this.convert(tblSchoolNetworkSchool);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblSchoolNetworkSchool: TblSchoolNetworkSchool): Observable<TblSchoolNetworkSchool> {
        const copy = this.convert(tblSchoolNetworkSchool);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblSchoolNetworkSchool> {
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
    deleteBySchool(id: number): Observable<Response> {
        const resourceUrls = SERVER_API_URL + '/api/tbl-school-network-schools-by-id/';
        return this.http.delete(`${resourceUrls}/${id}`);
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
     * Convert a returned JSON object to TblSchoolNetworkSchool.
     */
    private convertItemFromServer(json: any): TblSchoolNetworkSchool {
        const entity: TblSchoolNetworkSchool = Object.assign(new TblSchoolNetworkSchool(), json);
        entity.dtmCreated = this.dateUtils
            .convertDateTimeFromServer(json.dtmCreated);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblSchoolNetworkSchool to a JSON which can be sent to the server.
     */
    private convert(tblSchoolNetworkSchool: TblSchoolNetworkSchool): TblSchoolNetworkSchool {
        const copy: TblSchoolNetworkSchool = Object.assign({}, tblSchoolNetworkSchool);

        copy.dtmCreated = this.dateUtils.toDate(tblSchoolNetworkSchool.dtmCreated);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblSchoolNetworkSchool.dtmLastUpdate);
        return copy;
    }
}
