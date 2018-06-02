import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblGrade } from './tbl-grade.model';
import { TblGradeService } from './tbl-grade.service';

@Component({
    selector: 'jhi-tbl-grade-detail',
    templateUrl: './tbl-grade-detail.component.html'
})
export class TblGradeDetailComponent implements OnInit {

    tblGrade: TblGrade;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblGradeService: TblGradeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblGrades();
    }

    load(id) {
        this.tblGradeService.find(id).subscribe((tblGrade) => {
            this.tblGrade = tblGrade;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblGrades() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblGradeListModification',
            (response) => this.load(this.tblGrade.id)
        );
    }
}
