import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblGuardianType } from './tbl-guardian-type.model';
import { TblGuardianTypeService } from './tbl-guardian-type.service';

@Component({
    selector: 'jhi-tbl-guardian-type-detail',
    templateUrl: './tbl-guardian-type-detail.component.html'
})
export class TblGuardianTypeDetailComponent implements OnInit, OnDestroy {

    tblGuardianType: TblGuardianType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblGuardianTypeService: TblGuardianTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblGuardianTypes();
    }

    load(id) {
        this.tblGuardianTypeService.find(id).subscribe((tblGuardianType) => {
            this.tblGuardianType = tblGuardianType;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
       this.subscription.unsubscribe();
       this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTblGuardianTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblGuardianTypeListModification',
            (response) => this.load(this.tblGuardianType.id)
        );
    }
}
