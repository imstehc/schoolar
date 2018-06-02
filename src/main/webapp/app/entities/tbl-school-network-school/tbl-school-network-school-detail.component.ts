import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblSchoolNetworkSchool } from './tbl-school-network-school.model';
import { TblSchoolNetworkSchoolService } from './tbl-school-network-school.service';

@Component({
    selector: 'jhi-tbl-school-network-school-detail',
    templateUrl: './tbl-school-network-school-detail.component.html'
})
export class TblSchoolNetworkSchoolDetailComponent implements OnInit {

    tblSchoolNetworkSchool: TblSchoolNetworkSchool;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblSchoolNetworkSchoolService: TblSchoolNetworkSchoolService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblSchoolNetworkSchools();
    }

    load(id) {
        this.tblSchoolNetworkSchoolService.find(id).subscribe((tblSchoolNetworkSchool) => {
            this.tblSchoolNetworkSchool = tblSchoolNetworkSchool;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblSchoolNetworkSchools() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblSchoolNetworkSchoolListModification',
            (response) => this.load(this.tblSchoolNetworkSchool.id)
        );
    }
}
