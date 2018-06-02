import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblClassSubjectTeacher } from './tbl-class-subject-teacher.model';
import { TblClassSubjectTeacherService } from './tbl-class-subject-teacher.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-class-subject-teacher',
    templateUrl: './tbl-class-subject-teacher.component.html'
})
export class TblClassSubjectTeacherComponent implements OnInit {
tblClassSubjectTeachers: TblClassSubjectTeacher[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblClassSubjectTeacherService: TblClassSubjectTeacherService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblClassSubjectTeacherService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblClassSubjectTeachers = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblClassSubjectTeachers();
    }

    trackId(index: number, item: TblClassSubjectTeacher) {
        return item.id;
    }
    registerChangeInTblClassSubjectTeachers() {
        this.eventSubscriber = this.eventManager.subscribe('tblClassSubjectTeacherListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
