import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblSchoolHistory } from './tbl-school-history.model';
import { TblSchoolHistoryService } from './tbl-school-history.service';

@Component({
    selector: 'jhi-tbl-school-history-detail',
    templateUrl: './tbl-school-history-detail.component.html'
})
export class TblSchoolHistoryDetailComponent implements OnInit {

    tblSchoolHistory: TblSchoolHistory;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblSchoolHistoryService: TblSchoolHistoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblSchoolHistories();
    }

    load(id) {
        this.tblSchoolHistoryService.find(id).subscribe((tblSchoolHistory) => {
            this.tblSchoolHistory = tblSchoolHistory;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblSchoolHistories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblSchoolHistoryListModification',
            (response) => this.load(this.tblSchoolHistory.id)
        );
    }
}
