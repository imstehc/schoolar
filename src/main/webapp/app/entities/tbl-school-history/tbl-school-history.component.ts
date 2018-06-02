import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblSchoolHistory } from './tbl-school-history.model';
import { TblSchoolHistoryService } from './tbl-school-history.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-school-history',
    templateUrl: './tbl-school-history.component.html'
})
export class TblSchoolHistoryComponent implements OnInit {
tblSchoolHistories: TblSchoolHistory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblSchoolHistoryService: TblSchoolHistoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblSchoolHistoryService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblSchoolHistories = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblSchoolHistories();
    }

    trackId(index: number, item: TblSchoolHistory) {
        return item.id;
    }
    registerChangeInTblSchoolHistories() {
        this.eventSubscriber = this.eventManager.subscribe('tblSchoolHistoryListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
