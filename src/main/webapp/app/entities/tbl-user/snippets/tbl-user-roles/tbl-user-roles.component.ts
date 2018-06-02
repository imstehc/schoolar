import { TblSchoolService } from './../../../tbl-school/tbl-school.service';
import { UserSchool } from './../../../tbl-school/tbl-school.model';

import { TblUserDTO } from './../../tbl-user.model';
import { TblUserRolesService } from './tbl-user-roles.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TblUserRolesModel } from './tbl-user-roles.model';
import { TblSchoolUserRole } from '../../../tbl-school-user-role/tbl-school-user-role.model';
import { TblSchool, SchoolRoles } from '../../../tbl-school/tbl-school.model';
import { TblRoleService } from '../../../tbl-role';
import { ResponseWrapper } from '../../../../shared';
import { TblUserService } from '../../tbl-user.service';

@Component({
    selector: 'jhi-tbl-user-roles',
    templateUrl: './tbl-user-roles.component.html',
    styleUrls: [
        'tbl-user-roles.component.scss'
    ]
})
export class TblUserRolesComponent implements OnInit {
    @Input('tblUser') tblUser: TblUserDTO;
    schoolRoles: SchoolRoles[];
    schoolIndex: number;
    tblUserRolesModel: TblUserRolesModel[];
    isSelectedItem: number;
    tblSchoolUserRole: TblSchoolUserRole[] = [];
    selectedSchool: SchoolRoles;
    schoolList = [];
    constructor(
        private route: ActivatedRoute,
        private tblUserRolesService: TblUserRolesService,
        private tblRoleService: TblRoleService,
        private tblUserService: TblUserService,
        private tblSchoolService: TblSchoolService
    ) { }

    ngOnInit() {
        this.isSelectedItem = 0;
        this.schoolIndex = 0;

        this.tblUserRolesModel = [new TblUserRolesModel];
        this.getUserRoles();
        if (this.tblUser.id !== undefined) {
            this.tblSchoolService.querySchoolsRoles(this.tblUser.id)
                .subscribe((res: ResponseWrapper) => {
                    this.tblUser.schoolRoles = res.json;
                })
        } else {
            this.tblUserService.getSchoolsCurrentUser()
                .subscribe((res: ResponseWrapper) => {
                    this.schoolRoles = res.json;
                    this.tblUser.schoolRoles = this.schoolRoles;
                })
        }
    }

    getUserRoles(): any {
        if (this.tblUser.id !== undefined) {
            this.tblUserRolesService.getSchoolUserRoles()
                .subscribe((data: TblUserRolesModel[]) => {
                    if (data.length === 0) {
                        this.getSchoolRoles();
                    } else {
                        this.handleUser(data);
                    }
                }, ((error) => console.log(error)));
        } else {
            this.getSchoolRoles();
        }
    }

    setTblSchoolUserRole(index?, role?, event?: HTMLInputElement) {

        const school = this.createSchool();
        const schoolUserRole = this.createSchoolUserRole(school, role);
        this.checkSchoolRole(event, schoolUserRole);

        this.tblUser.tblSchoolUserRole = this.tblSchoolUserRole;
    }

    private checkSchoolRole(event: HTMLInputElement, schoolUserRole: TblSchoolUserRole) {
        if (event.checked) {
            this.tblSchoolUserRole.push(schoolUserRole);
        } else {
            const filter = this.tblSchoolUserRole.filter(function(e) {
                return !(e.school.id === schoolUserRole.school.id && e.role.id === schoolUserRole.role.id);
            }
            );
            this.tblSchoolUserRole = [];
            this.tblSchoolUserRole = filter;
        }
    }

    private createSchoolUserRole(school: TblSchool, role) {
        const schoolUserRole: TblSchoolUserRole = new TblSchoolUserRole();
        schoolUserRole.school = school;
        schoolUserRole.role = role;
        schoolUserRole.user = null;
        schoolUserRole.dtmCreated = new Date();
        schoolUserRole.dtmLastUpdate = new Date();
        schoolUserRole.intExcluded = 0;
        return schoolUserRole;
    }

    private createSchool() {
        const school: TblSchool = new TblSchool();

        school.id = this.selectedSchool.id;
        school.strCode = '0';
        school.strName = this.selectedSchool.strName;
        school.strLegalName = this.selectedSchool.strName;
        school.strCNPJ = '0';
        school.dtmCreated = new Date();
        school.dtmLastUpdate = new Date();
        school.dtmLastUpdate = new Date();
        school.intExcluded = 0;
        return school;
    }

    getSchoolRoles(): any {
        this.tblUserRolesService.getOnlyRoles()
            .subscribe((data: TblUserRolesModel[]) => {
                this.handleUser(data);
            }, ((error) => console.log(error)));
    }

    public handleUser(data): void {
        data.map((user) => {
            this.tblUserRolesModel = user.schoolList;
        });
    }

    listClick(event, school, index) {
        this.selectedSchool = school;
        this.isSelectedItem = index;
        this.schoolIndex = index;
    }
}
