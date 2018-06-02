import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblNfc } from './tbl-nfc.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblNfcService {

    private resourceUrl = SERVER_API_URL + 'api/tbl-nfcs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblNfc: TblNfc): Observable<TblNfc> {
        const copy = this.convert(tblNfc);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblNfc: TblNfc): Observable<TblNfc> {
        const copy = this.convert(tblNfc);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblNfc> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    };
    queryByUserId(id: number, req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        const resourceUrl = SERVER_API_URL + 'api/tbl-nfcs-associated/'
        return this.http.get(`${resourceUrl}/${id}`)
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
     * Convert a returned JSON object to TblNfc.
     */
    private convertItemFromServer(json: any): TblNfc {
        const entity: TblNfc = Object.assign(new TblNfc(), json);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblNfc to a JSON which can be sent to the server.
     */
    private convert(tblNfc: TblNfc): TblNfc {
        const copy: TblNfc = Object.assign({}, tblNfc);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblNfc.dtmLastUpdate);
        return copy;
    }
}
