import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblSchool } from './tbl-school.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblSchoolService {

    private resourceUrl = SERVER_API_URL + 'api/tbl-schools';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblSchool: TblSchool): Observable<TblSchool> {
        const copy = this.convert(tblSchool);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblSchool: TblSchool): Observable<TblSchool> {
        const copy = this.convert(tblSchool);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblSchool> {
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

    querySchoolsByName(name: string, limit: number, req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        const resourceUrls = SERVER_API_URL + '/api/tbl-schools-name/';
        return this.http.get(`${resourceUrls}/${name}/${limit}`).map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    querySchoolsRoles(id: number, req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        const resourceUrls = SERVER_API_URL + '/api/tbl-users/user-edit';
        return this.http.get(`${resourceUrls}/${id}`).map((res: Response) => this.convertResponse(res));
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
     * Convert a returned JSON object to TblSchool.
     */
    private convertItemFromServer(json: any): TblSchool {
        const entity: TblSchool = Object.assign(new TblSchool(), json);
        entity.dtmCreated = this.dateUtils
            .convertDateTimeFromServer(json.dtmCreated);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblSchool to a JSON which can be sent to the server.
     */
    private convert(tblSchool: TblSchool): TblSchool {
        const copy: TblSchool = Object.assign({}, tblSchool);

        copy.dtmCreated = this.dateUtils.toDate(tblSchool.dtmCreated);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblSchool.dtmLastUpdate);
        return copy;
    }
}
