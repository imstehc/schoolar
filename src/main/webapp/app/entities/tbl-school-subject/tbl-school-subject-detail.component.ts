import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblSchoolSubject } from './tbl-school-subject.model';
import { TblSchoolSubjectService } from './tbl-school-subject.service';

@Component({
    selector: 'jhi-tbl-school-subject-detail',
    templateUrl: './tbl-school-subject-detail.component.html'
})
export class TblSchoolSubjectDetailComponent implements OnInit {

    tblSchoolSubject: TblSchoolSubject;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblSchoolSubjectService: TblSchoolSubjectService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblSchoolSubjects();
    }

    load(id) {
        this.tblSchoolSubjectService.find(id).subscribe((tblSchoolSubject) => {
            this.tblSchoolSubject = tblSchoolSubject;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblSchoolSubjects() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblSchoolSubjectListModification',
            (response) => this.load(this.tblSchoolSubject.id)
        );
    }
}
