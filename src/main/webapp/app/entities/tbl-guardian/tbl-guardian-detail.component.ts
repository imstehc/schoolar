import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblGuardian } from './tbl-guardian.model';
import { TblGuardianService } from './tbl-guardian.service';

@Component({
    selector: 'jhi-tbl-guardian-detail',
    templateUrl: './tbl-guardian-detail.component.html'
})
export class TblGuardianDetailComponent implements OnInit {

    tblGuardian: TblGuardian;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblGuardianService: TblGuardianService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblGuardians();
    }

    load(id) {
        this.tblGuardianService.find(id).subscribe((tblGuardian) => {
            this.tblGuardian = tblGuardian;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblGuardians() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblGuardianListModification',
            (response) => this.load(this.tblGuardian.id)
        );
    }
}
