import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblSchoolSubject } from './tbl-school-subject.model';
import { TblSchoolSubjectService } from './tbl-school-subject.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-school-subject',
    templateUrl: './tbl-school-subject.component.html'
})
export class TblSchoolSubjectComponent implements OnInit {
tblSchoolSubjects: TblSchoolSubject[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblSchoolSubjectService: TblSchoolSubjectService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblSchoolSubjectService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblSchoolSubjects = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblSchoolSubjects();
    }

    trackId(index: number, item: TblSchoolSubject) {
        return item.id;
    }
    registerChangeInTblSchoolSubjects() {
        this.eventSubscriber = this.eventManager.subscribe('tblSchoolSubjectListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
