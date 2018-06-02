import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblSubject } from './tbl-subject.model';
import { TblSubjectService } from './tbl-subject.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-subject',
    templateUrl: './tbl-subject.component.html'
})
export class TblSubjectComponent implements OnInit {
tblSubjects: TblSubject[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblSubjectService: TblSubjectService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblSubjectService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblSubjects = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblSubjects();
    }

    trackId(index: number, item: TblSubject) {
        return item.id;
    }
    registerChangeInTblSubjects() {
        this.eventSubscriber = this.eventManager.subscribe('tblSubjectListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
