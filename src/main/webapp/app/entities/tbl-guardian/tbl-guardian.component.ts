import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblGuardian } from './tbl-guardian.model';
import { TblGuardianService } from './tbl-guardian.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-guardian',
    templateUrl: './tbl-guardian.component.html'
})
export class TblGuardianComponent implements OnInit {
tblGuardians: TblGuardian[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblGuardianService: TblGuardianService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblGuardianService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblGuardians = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblGuardians();
    }

    trackId(index: number, item: TblGuardian) {
        return item.id;
    }
    registerChangeInTblGuardians() {
        this.eventSubscriber = this.eventManager.subscribe('tblGuardianListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
