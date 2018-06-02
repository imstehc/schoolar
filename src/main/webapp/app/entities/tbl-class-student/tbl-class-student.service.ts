import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblClassStudent } from './tbl-class-student.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblClassStudentService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-class-students';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblClassStudent: TblClassStudent): Observable<TblClassStudent> {
        const copy = this.convert(tblClassStudent);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblClassStudent: TblClassStudent): Observable<TblClassStudent> {
        const copy = this.convert(tblClassStudent);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblClassStudent> {
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
     * Convert a returned JSON object to TblClassStudent.
     */
    private convertItemFromServer(json: any): TblClassStudent {
        const entity: TblClassStudent = Object.assign(new TblClassStudent(), json);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblClassStudent to a JSON which can be sent to the server.
     */
    private convert(tblClassStudent: TblClassStudent): TblClassStudent {
        const copy: TblClassStudent = Object.assign({}, tblClassStudent);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblClassStudent.dtmLastUpdate);
        return copy;
    }
}
