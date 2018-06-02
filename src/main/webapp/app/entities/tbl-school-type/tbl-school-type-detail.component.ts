import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblSchoolType } from './tbl-school-type.model';
import { TblSchoolTypeService } from './tbl-school-type.service';

@Component({
    selector: 'jhi-tbl-school-type-detail',
    templateUrl: './tbl-school-type-detail.component.html'
})
export class TblSchoolTypeDetailComponent implements OnInit, OnDestroy {

    tblSchoolType: TblSchoolType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblSchoolTypeService: TblSchoolTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblSchoolTypes();
    }

    load(id) {
        this.tblSchoolTypeService.find(id).subscribe((tblSchoolType) => {
            this.tblSchoolType = tblSchoolType;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTblSchoolTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblSchoolTypeListModification',
            (response) => this.load(this.tblSchoolType.id)
        );
    }
}
