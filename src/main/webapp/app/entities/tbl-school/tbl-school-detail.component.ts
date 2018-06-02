import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblSchool } from './tbl-school.model';
import { TblSchoolService } from './tbl-school.service';

@Component({
    selector: 'jhi-tbl-school-detail',
    templateUrl: './tbl-school-detail.component.html'
})
export class TblSchoolDetailComponent implements OnInit {

    tblSchool: TblSchool;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblSchoolService: TblSchoolService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblSchools();
    }

    load(id) {
        this.tblSchoolService.find(id).subscribe((tblSchool) => {
            this.tblSchool = tblSchool;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblSchools() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblSchoolListModification',
            (response) => this.load(this.tblSchool.id)
        );
    }
}
