import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblSchoolUserRole } from './tbl-school-user-role.model';
import { TblSchoolUserRoleService } from './tbl-school-user-role.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-school-user-role',
    templateUrl: './tbl-school-user-role.component.html'
})
export class TblSchoolUserRoleComponent implements OnInit {
tblSchoolUserRoles: TblSchoolUserRole[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblSchoolUserRoleService: TblSchoolUserRoleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblSchoolUserRoleService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblSchoolUserRoles = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblSchoolUserRoles();
    }

    trackId(index: number, item: TblSchoolUserRole) {
        return item.id;
    }
    registerChangeInTblSchoolUserRoles() {
        this.eventSubscriber = this.eventManager.subscribe('tblSchoolUserRoleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
