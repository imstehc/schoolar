import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblShiftType } from './tbl-shift-type.model';
import { TblShiftTypeService } from './tbl-shift-type.service';

@Component({
    selector: 'jhi-tbl-shift-type-detail',
    templateUrl: './tbl-shift-type-detail.component.html'
})
export class TblShiftTypeDetailComponent implements OnInit, OnDestroy {

    tblShiftType: TblShiftType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblShiftTypeService: TblShiftTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblShiftTypes();
    }

    load(id) {
        this.tblShiftTypeService.find(id).subscribe((tblShiftType) => {
            this.tblShiftType = tblShiftType;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
       this.subscription.unsubscribe();
       this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTblShiftTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblShiftTypeListModification',
            (response) => this.load(this.tblShiftType.id)
        );
    }
}
