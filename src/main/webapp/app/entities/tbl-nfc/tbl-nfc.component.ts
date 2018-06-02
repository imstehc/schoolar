import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblNfc } from './tbl-nfc.model';
import { TblNfcService } from './tbl-nfc.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-nfc',
    templateUrl: './tbl-nfc.component.html'
})
export class TblNfcComponent implements OnInit {
tblNfcs: TblNfc[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblNfcService: TblNfcService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblNfcService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblNfcs = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblNfcs();
    }

    trackId(index: number, item: TblNfc) {
        return item.id;
    }
    registerChangeInTblNfcs() {
        this.eventSubscriber = this.eventManager.subscribe('tblNfcListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
