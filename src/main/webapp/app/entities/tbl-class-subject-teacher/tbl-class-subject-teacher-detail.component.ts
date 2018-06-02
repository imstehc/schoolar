import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblClassSubjectTeacher } from './tbl-class-subject-teacher.model';
import { TblClassSubjectTeacherService } from './tbl-class-subject-teacher.service';

@Component({
    selector: 'jhi-tbl-class-subject-teacher-detail',
    templateUrl: './tbl-class-subject-teacher-detail.component.html'
})
export class TblClassSubjectTeacherDetailComponent implements OnInit {

    tblClassSubjectTeacher: TblClassSubjectTeacher;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblClassSubjectTeacherService: TblClassSubjectTeacherService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblClassSubjectTeachers();
    }

    load(id) {
        this.tblClassSubjectTeacherService.find(id).subscribe((tblClassSubjectTeacher) => {
            this.tblClassSubjectTeacher = tblClassSubjectTeacher;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblClassSubjectTeachers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblClassSubjectTeacherListModification',
            (response) => this.load(this.tblClassSubjectTeacher.id)
        );
    }
}
