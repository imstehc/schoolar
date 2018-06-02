import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblClassStudent } from './tbl-class-student.model';
import { TblClassStudentService } from './tbl-class-student.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-class-student',
    templateUrl: './tbl-class-student.component.html'
})
export class TblClassStudentComponent implements OnInit {
tblClassStudents: TblClassStudent[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblClassStudentService: TblClassStudentService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblClassStudentService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblClassStudents = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblClassStudents();
    }

    trackId(index: number, item: TblClassStudent) {
        return item.id;
    }
    registerChangeInTblClassStudents() {
        this.eventSubscriber = this.eventManager.subscribe('tblClassStudentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
