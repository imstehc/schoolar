import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblGuardianHistory } from './tbl-guardian-history.model';
import { TblGuardianHistoryService } from './tbl-guardian-history.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-guardian-history',
    templateUrl: './tbl-guardian-history.component.html'
})
export class TblGuardianHistoryComponent implements OnInit {
tblGuardianHistories: TblGuardianHistory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblGuardianHistoryService: TblGuardianHistoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblGuardianHistoryService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblGuardianHistories = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblGuardianHistories();
    }

    trackId(index: number, item: TblGuardianHistory) {
        return item.id;
    }
    registerChangeInTblGuardianHistories() {
        this.eventSubscriber = this.eventManager.subscribe('tblGuardianHistoryListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
