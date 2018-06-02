import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../../../../app.constants';
import { Observable } from 'rxjs';

@Injectable()
export class TblUserRolesService {
  private resourceUrl = SERVER_API_URL + 'api/tbl-roles/schoolUserRole/';
  private resourceByUserUrl = SERVER_API_URL + 'api/tbl-roles/schoolUserRoleByUser/';

  constructor(private http: Http) { }

  getSchoolUserRoles(): Observable<any> {
    return this.http.get(this.resourceByUserUrl).map((response: any) => response.json());
  }

  getOnlyRoles(): Observable<any> {
    return this.http.get(this.resourceUrl).map((response: any) => response.json());
  }
}
