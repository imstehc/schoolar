import { TblLogin } from './../tbl-login/tbl-login.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TblUserDTO } from './tbl-user.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TblUserService {
    public headers: any = new Headers({ 'Content-Type': 'application/json' });
    private resourceUrl = SERVER_API_URL + 'api/tbl-users';

    constructor(
        private http: Http, private dateUtils: JhiDateUtils
    ) { }

    create(tblUser: TblUserDTO): Observable<TblUserDTO> {
        const copy = this.convert(tblUser);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return jsonResponse;
        });
    }

    update(tblUser: TblUserDTO): Observable<TblUserDTO> {
        const copy = this.convert(tblUser);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TblUserDTO> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    querybyName(name: string, limit: number, req?: any): Observable<ResponseWrapper> {
        const resourceUrl = SERVER_API_URL + 'api/tbl-users-name';
        const options = createRequestOption(req);
        return this.http.get(`${resourceUrl}/${name}/${limit}`)
            .map((res: Response) => this.convertResponse(res));
    }

    createLogin(tblLogin: TblLogin) {
        const copy = this.convert(tblLogin);
        return this.http.post(`${this.resourceUrl}register`, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        })
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => new ResponseWrapper(res.headers, res.json(), res.status));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    getSchoolsCurrentUser(req?: any) {
        const options = createRequestOption(req);
        return this.http.get(`${this.resourceUrl}/tbl-schools/logged`, options)
            .map((res: Response) => new ResponseWrapper(res.headers, res.json(), res.status));
    }

    /* GET LOGIN */
    getLogins(id: number, req?: any): any {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    getLoginsByUser(id: number, req?: any) {
        const CopyresourceUserUrl = this.resourceUrl + '/uaa/logins/'
        const options = createRequestOption(req);
        return this.http.get(`${CopyresourceUserUrl}${id}`, options)
            .map((res: Response) => this.convertResponse(res));
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
     * Convert a returned JSON object to TblUserDTO.
     */
    private convertItemFromServer(json: any): TblUserDTO {
        const entity: TblUserDTO = Object.assign(new TblUserDTO(), json);
        entity.dtmBirthday = this.dateUtils
            .convertDateTimeFromServer(json.dtmBirthday);
        return entity;
    }

    /**
     * Convert a TblUserDTO to a JSON which can be sent to the server.
     */
    private convert(tblUser: TblUserDTO): TblUserDTO {
        const copy: TblUserDTO = Object.assign({}, tblUser);

        copy.dtmBirthday = this.dateUtils.toDate(tblUser.dtmBirthday);
        return copy;
    }
}
