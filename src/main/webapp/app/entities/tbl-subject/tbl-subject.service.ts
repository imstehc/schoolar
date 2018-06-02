import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblSubject } from './tbl-subject.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblSubjectService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-subjects';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblSubject: TblSubject): Observable<TblSubject> {
        const copy = this.convert(tblSubject);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblSubject: TblSubject): Observable<TblSubject> {
        const copy = this.convert(tblSubject);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblSubject> {
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
     * Convert a returned JSON object to TblSubject.
     */
    private convertItemFromServer(json: any): TblSubject {
        const entity: TblSubject = Object.assign(new TblSubject(), json);
        entity.dtmCreated = this.dateUtils
            .convertDateTimeFromServer(json.dtmCreated);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblSubject to a JSON which can be sent to the server.
     */
    private convert(tblSubject: TblSubject): TblSubject {
        const copy: TblSubject = Object.assign({}, tblSubject);

        copy.dtmCreated = this.dateUtils.toDate(tblSubject.dtmCreated);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblSubject.dtmLastUpdate);
        return copy;
    }
}
