import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblSchoolUser } from './tbl-school-user.model';
import { TblSchoolUserService } from './tbl-school-user.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-school-user',
    templateUrl: './tbl-school-user.component.html'
})
export class TblSchoolUserComponent implements OnInit, OnDestroy {
tblSchoolUsers: TblSchoolUser[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblSchoolUserService: TblSchoolUserService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblSchoolUserService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblSchoolUsers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblSchoolUsers();
    }

    ngOnDestroy() {
       this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TblSchoolUser) {
        return item.id;
    }
    registerChangeInTblSchoolUsers() {
        this.eventSubscriber = this.eventManager.subscribe('tblSchoolUserListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
