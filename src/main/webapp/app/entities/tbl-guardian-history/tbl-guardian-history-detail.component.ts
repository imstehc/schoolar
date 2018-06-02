import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblGuardianHistory } from './tbl-guardian-history.model';
import { TblGuardianHistoryService } from './tbl-guardian-history.service';

@Component({
    selector: 'jhi-tbl-guardian-history-detail',
    templateUrl: './tbl-guardian-history-detail.component.html'
})
export class TblGuardianHistoryDetailComponent implements OnInit, OnDestroy {

    tblGuardianHistory: TblGuardianHistory;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblGuardianHistoryService: TblGuardianHistoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblGuardianHistories();
    }

    load(id) {
        this.tblGuardianHistoryService.find(id).subscribe((tblGuardianHistory) => {
            this.tblGuardianHistory = tblGuardianHistory;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTblGuardianHistories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblGuardianHistoryListModification',
            (response) => this.load(this.tblGuardianHistory.id)
        );
    }
}
