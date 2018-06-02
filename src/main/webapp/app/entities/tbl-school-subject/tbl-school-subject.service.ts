import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblSchoolSubject } from './tbl-school-subject.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblSchoolSubjectService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-school-subjects';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblSchoolSubject: TblSchoolSubject): Observable<TblSchoolSubject> {
        const copy = this.convert(tblSchoolSubject);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblSchoolSubject: TblSchoolSubject): Observable<TblSchoolSubject> {
        const copy = this.convert(tblSchoolSubject);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblSchoolSubject> {
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
     * Convert a returned JSON object to TblSchoolSubject.
     */
    private convertItemFromServer(json: any): TblSchoolSubject {
        const entity: TblSchoolSubject = Object.assign(new TblSchoolSubject(), json);
        entity.dtmCreated = this.dateUtils
            .convertDateTimeFromServer(json.dtmCreated);
        entity.dtmLastUpdade = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdade);
        return entity;
    }

    /**
     * Convert a TblSchoolSubject to a JSON which can be sent to the server.
     */
    private convert(tblSchoolSubject: TblSchoolSubject): TblSchoolSubject {
        const copy: TblSchoolSubject = Object.assign({}, tblSchoolSubject);

        copy.dtmCreated = this.dateUtils.toDate(tblSchoolSubject.dtmCreated);

        copy.dtmLastUpdade = this.dateUtils.toDate(tblSchoolSubject.dtmLastUpdade);
        return copy;
    }
}
