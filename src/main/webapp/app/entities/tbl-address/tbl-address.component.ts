import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblAddress } from './tbl-address.model';
import { TblAddressService } from './tbl-address.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-address',
    templateUrl: './tbl-address.component.html'
})
export class TblAddressComponent implements OnInit {
tblAddresses: TblAddress[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblAddressService: TblAddressService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblAddressService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblAddresses = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblAddresses();
    }

    trackId(index: number, item: TblAddress) {
        return item.id;
    }
    registerChangeInTblAddresses() {
        this.eventSubscriber = this.eventManager.subscribe('tblAddressListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
