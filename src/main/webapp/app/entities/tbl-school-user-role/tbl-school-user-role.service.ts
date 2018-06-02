import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblSchoolUserRole } from './tbl-school-user-role.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblSchoolUserRoleService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-school-user-roles';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblSchoolUserRole: TblSchoolUserRole): Observable<TblSchoolUserRole> {
        const copy = this.convert(tblSchoolUserRole);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblSchoolUserRole: TblSchoolUserRole): Observable<TblSchoolUserRole> {
        const copy = this.convert(tblSchoolUserRole);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblSchoolUserRole> {
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
     * Convert a returned JSON object to TblSchoolUserRole.
     */
    private convertItemFromServer(json: any): TblSchoolUserRole {
        const entity: TblSchoolUserRole = Object.assign(new TblSchoolUserRole(), json);
        entity.dtmCreated = this.dateUtils
            .convertDateTimeFromServer(json.dtmCreated);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblSchoolUserRole to a JSON which can be sent to the server.
     */
    private convert(tblSchoolUserRole: TblSchoolUserRole): TblSchoolUserRole {
        const copy: TblSchoolUserRole = Object.assign({}, tblSchoolUserRole);

        copy.dtmCreated = this.dateUtils.toDate(tblSchoolUserRole.dtmCreated);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblSchoolUserRole.dtmLastUpdate);
        return copy;
    }
}
