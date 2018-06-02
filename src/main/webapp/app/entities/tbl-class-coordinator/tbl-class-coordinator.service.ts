import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblClassCoordinator } from './tbl-class-coordinator.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblClassCoordinatorService {

    private resourceUrl =  SERVER_API_URL + 'api/tbl-class-coordinators';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tblClassCoordinator: TblClassCoordinator): Observable<TblClassCoordinator> {
        const copy = this.convert(tblClassCoordinator);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tblClassCoordinator: TblClassCoordinator): Observable<TblClassCoordinator> {
        const copy = this.convert(tblClassCoordinator);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblClassCoordinator> {
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
     * Convert a returned JSON object to TblClassCoordinator.
     */
    private convertItemFromServer(json: any): TblClassCoordinator {
        const entity: TblClassCoordinator = Object.assign(new TblClassCoordinator(), json);
        entity.dtmLastUpdate = this.dateUtils
            .convertDateTimeFromServer(json.dtmLastUpdate);
        return entity;
    }

    /**
     * Convert a TblClassCoordinator to a JSON which can be sent to the server.
     */
    private convert(tblClassCoordinator: TblClassCoordinator): TblClassCoordinator {
        const copy: TblClassCoordinator = Object.assign({}, tblClassCoordinator);

        copy.dtmLastUpdate = this.dateUtils.toDate(tblClassCoordinator.dtmLastUpdate);
        return copy;
    }
}
