import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TblAudienceClient } from './tbl-audience-client.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblAudienceClientService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-audience-clients';

    constructor(private http: Http) { }

    create(tblAudienceClient: TblAudienceClient): Observable<TblAudienceClient> {
        const copy = this.convert(tblAudienceClient);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblAudienceClient: TblAudienceClient): Observable<TblAudienceClient> {
        const copy = this.convert(tblAudienceClient);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblAudienceClient> {
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
     * Convert a returned JSON object to TblAudienceClient.
     */
    private convertItemFromServer(json: any): TblAudienceClient {
        const entity: TblAudienceClient = Object.assign(new TblAudienceClient(), json);
        return entity;
    }

    /**
     * Convert a TblAudienceClient to a JSON which can be sent to the server.
     */
    private convert(tblAudienceClient: TblAudienceClient): TblAudienceClient {
        const copy: TblAudienceClient = Object.assign({}, tblAudienceClient);
        return copy;
    }
}
