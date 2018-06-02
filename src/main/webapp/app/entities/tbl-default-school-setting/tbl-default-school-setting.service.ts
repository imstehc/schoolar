import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblDefaultSchoolSetting } from './tbl-default-school-setting.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblDefaultSchoolSettingService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-default-school-settings';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblDefaultSchoolSetting: TblDefaultSchoolSetting): Observable<TblDefaultSchoolSetting> {
        const copy = this.convert(tblDefaultSchoolSetting);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblDefaultSchoolSetting: TblDefaultSchoolSetting): Observable<TblDefaultSchoolSetting> {
        const copy = this.convert(tblDefaultSchoolSetting);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblDefaultSchoolSetting> {
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
     * Convert a returned JSON object to TblDefaultSchoolSetting.
     */
    private convertItemFromServer(json: any): TblDefaultSchoolSetting {
        const entity: TblDefaultSchoolSetting = Object.assign(new TblDefaultSchoolSetting(), json);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblDefaultSchoolSetting to a JSON which can be sent to the server.
     */
    private convert(tblDefaultSchoolSetting: TblDefaultSchoolSetting): TblDefaultSchoolSetting {
        const copy: TblDefaultSchoolSetting = Object.assign({}, tblDefaultSchoolSetting);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblDefaultSchoolSetting.dtmLastUpdate);
        return copy;
    }
}
