import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblSchoolUser } from './tbl-school-user.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblSchoolUserService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-school-users';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblSchoolUser: TblSchoolUser): Observable<TblSchoolUser> {
        const copy = this.convert(tblSchoolUser);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblSchoolUser: TblSchoolUser): Observable<TblSchoolUser> {
        const copy = this.convert(tblSchoolUser);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblSchoolUser> {
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
     * Convert a returned JSON object to TblSchoolUser.
     */
    private convertItemFromServer(json: any): TblSchoolUser {
        const entity: TblSchoolUser = Object.assign(new TblSchoolUser(), json);
        entity.dtmCreated = this.dateUtils
            .convertDateTimeFromServer(json.dtmCreated);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblSchoolUser to a JSON which can be sent to the server.
     */
    private convert(tblSchoolUser: TblSchoolUser): TblSchoolUser {
        const copy: TblSchoolUser = Object.assign({}, tblSchoolUser);

        copy.dtmCreated = this.dateUtils.toDate(tblSchoolUser.dtmCreated);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblSchoolUser.dtmLastUpdate);
        return copy;
    }
}
