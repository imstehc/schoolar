import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblSchoolUserRole } from './tbl-school-user-role.model';
import { TblSchoolUserRoleService } from './tbl-school-user-role.service';

@Component({
    selector: 'jhi-tbl-school-user-role-detail',
    templateUrl: './tbl-school-user-role-detail.component.html'
})
export class TblSchoolUserRoleDetailComponent implements OnInit {

    tblSchoolUserRole: TblSchoolUserRole;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblSchoolUserRoleService: TblSchoolUserRoleService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblSchoolUserRoles();
    }

    load(id) {
        this.tblSchoolUserRoleService.find(id).subscribe((tblSchoolUserRole) => {
            this.tblSchoolUserRole = tblSchoolUserRole;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblSchoolUserRoles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblSchoolUserRoleListModification',
            (response) => this.load(this.tblSchoolUserRole.id)
        );
    }
}
