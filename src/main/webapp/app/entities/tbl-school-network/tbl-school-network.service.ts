import { TblSchool } from './../tbl-school/tbl-school.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblSchoolNetwork } from './tbl-school-network.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblSchoolNetworkService {

    private resourceUrl = SERVER_API_URL + 'api/tbl-school-networks';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblSchoolNetwork: TblSchoolNetwork): Observable<TblSchoolNetwork> {
        const copy = this.convert(tblSchoolNetwork);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblSchoolNetwork: TblSchoolNetwork): Observable<TblSchoolNetwork> {
        const copy = this.convert(tblSchoolNetwork);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblSchoolNetwork> {
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

    querySchools(id: number, req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        const resourceUrls = SERVER_API_URL + '/api/tbl-school-from-school-networks/';
        return this.http.get(`${resourceUrls}/${id}`).map((res: Response) => this.convertResponse(res));
    }

    /**
     * Convert a returned JSON object to TblSchoolNetwork.
     */
    private convertItemFromServer(json: any): TblSchoolNetwork {
        const entity: TblSchoolNetwork = Object.assign(new TblSchoolNetwork(), json);
        entity.dtmCreated = this.dateUtils
            .convertDateTimeFromServer(json.dtmCreated);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblSchoolNetwork to a JSON which can be sent to the server.
     */
    private convert(tblSchoolNetwork: TblSchoolNetwork): TblSchoolNetwork {
        const copy: TblSchoolNetwork = Object.assign({}, tblSchoolNetwork);

        copy.dtmCreated = this.dateUtils.toDate(tblSchoolNetwork.dtmCreated);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblSchoolNetwork.dtmLastUpdate);
        return copy;
    }
}
