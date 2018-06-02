import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblGuardianType } from './tbl-guardian-type.model';
import { TblGuardianTypeService } from './tbl-guardian-type.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-guardian-type',
    templateUrl: './tbl-guardian-type.component.html'
})
export class TblGuardianTypeComponent implements OnInit {
tblGuardianTypes: TblGuardianType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblGuardianTypeService: TblGuardianTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblGuardianTypeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblGuardianTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblGuardianTypes();
    }

    trackId(index: number, item: TblGuardianType) {
        return item.id;
    }
    registerChangeInTblGuardianTypes() {
        this.eventSubscriber = this.eventManager.subscribe('tblGuardianTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
