import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblSubject } from './tbl-subject.model';
import { TblSubjectService } from './tbl-subject.service';

@Component({
    selector: 'jhi-tbl-subject-detail',
    templateUrl: './tbl-subject-detail.component.html'
})
export class TblSubjectDetailComponent implements OnInit, OnDestroy {

    tblSubject: TblSubject;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblSubjectService: TblSubjectService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblSubjects();
    }

    load(id) {
        this.tblSubjectService.find(id).subscribe((tblSubject) => {
            this.tblSubject = tblSubject;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTblSubjects() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblSubjectListModification',
            (response) => this.load(this.tblSubject.id)
        );
    }
}
