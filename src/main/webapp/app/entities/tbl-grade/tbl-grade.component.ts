import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblGrade } from './tbl-grade.model';
import { TblGradeService } from './tbl-grade.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-grade',
    templateUrl: './tbl-grade.component.html'
})
export class TblGradeComponent implements OnInit {
tblGrades: TblGrade[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblGradeService: TblGradeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblGradeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblGrades = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblGrades();
    }

    trackId(index: number, item: TblGrade) {
        return item.id;
    }
    registerChangeInTblGrades() {
        this.eventSubscriber = this.eventManager.subscribe('tblGradeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
