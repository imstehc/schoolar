import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblClassStudent } from './tbl-class-student.model';
import { TblClassStudentService } from './tbl-class-student.service';

@Component({
    selector: 'jhi-tbl-class-student-detail',
    templateUrl: './tbl-class-student-detail.component.html'
})
export class TblClassStudentDetailComponent implements OnInit {

    tblClassStudent: TblClassStudent;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblClassStudentService: TblClassStudentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblClassStudents();
    }

    load(id) {
        this.tblClassStudentService.find(id).subscribe((tblClassStudent) => {
            this.tblClassStudent = tblClassStudent;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblClassStudents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblClassStudentListModification',
            (response) => this.load(this.tblClassStudent.id)
        );
    }
}
