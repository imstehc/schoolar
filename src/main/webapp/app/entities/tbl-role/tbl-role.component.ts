import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblRole } from './tbl-role.model';
import { TblRoleService } from './tbl-role.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-role',
    templateUrl: './tbl-role.component.html'
})
export class TblRoleComponent implements OnInit {
tblRoles: TblRole[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblRoleService: TblRoleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblRoleService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblRoles = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblRoles();
    }

    trackId(index: number, item: TblRole) {
        return item.id;
    }
    registerChangeInTblRoles() {
        this.eventSubscriber = this.eventManager.subscribe('tblRoleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
