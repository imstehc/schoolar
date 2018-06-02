import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblAddress } from './tbl-address.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblAddressService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-addresses';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblAddress: TblAddress): Observable<TblAddress> {
        const copy = this.convert(tblAddress);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblAddress: TblAddress): Observable<TblAddress> {
        const copy = this.convert(tblAddress);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblAddress> {
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
     * Convert a returned JSON object to TblAddress.
     */
    private convertItemFromServer(json: any): TblAddress {
        const entity: TblAddress = Object.assign(new TblAddress(), json);
        entity.dtmCreate = this.dateUtils
            .convertDateTimeFromServer(json.dtmCreate);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblAddress to a JSON which can be sent to the server.
     */
    private convert(tblAddress: TblAddress): TblAddress {
        const copy: TblAddress = Object.assign({}, tblAddress);

        copy.dtmCreate = this.dateUtils.toDate(tblAddress.dtmCreate);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblAddress.dtmLastUpdate);
        return copy;
    }
}
