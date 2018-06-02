import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblClassSubjectTeacher } from './tbl-class-subject-teacher.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblClassSubjectTeacherService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-class-subject-teachers';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblClassSubjectTeacher: TblClassSubjectTeacher): Observable<TblClassSubjectTeacher> {
        const copy = this.convert(tblClassSubjectTeacher);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblClassSubjectTeacher: TblClassSubjectTeacher): Observable<TblClassSubjectTeacher> {
        const copy = this.convert(tblClassSubjectTeacher);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblClassSubjectTeacher> {
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
     * Convert a returned JSON object to TblClassSubjectTeacher.
     */
    private convertItemFromServer(json: any): TblClassSubjectTeacher {
        const entity: TblClassSubjectTeacher = Object.assign(new TblClassSubjectTeacher(), json);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblClassSubjectTeacher to a JSON which can be sent to the server.
     */
    private convert(tblClassSubjectTeacher: TblClassSubjectTeacher): TblClassSubjectTeacher {
        const copy: TblClassSubjectTeacher = Object.assign({}, tblClassSubjectTeacher);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblClassSubjectTeacher.dtmLastUpdate);
        return copy;
    }
}
