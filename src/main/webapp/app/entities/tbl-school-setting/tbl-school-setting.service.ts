import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblSchoolSetting } from './tbl-school-setting.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblSchoolSettingService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-school-settings';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblSchoolSetting: TblSchoolSetting): Observable<TblSchoolSetting> {
        const copy = this.convert(tblSchoolSetting);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblSchoolSetting: TblSchoolSetting): Observable<TblSchoolSetting> {
        const copy = this.convert(tblSchoolSetting);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblSchoolSetting> {
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
     * Convert a returned JSON object to TblSchoolSetting.
     */
    private convertItemFromServer(json: any): TblSchoolSetting {
        const entity: TblSchoolSetting = Object.assign(new TblSchoolSetting(), json);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblSchoolSetting to a JSON which can be sent to the server.
     */
    private convert(tblSchoolSetting: TblSchoolSetting): TblSchoolSetting {
        const copy: TblSchoolSetting = Object.assign({}, tblSchoolSetting);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblSchoolSetting.dtmLastUpdate);
        return copy;
    }
}
