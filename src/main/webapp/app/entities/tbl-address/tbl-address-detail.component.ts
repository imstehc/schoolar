import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblAddress } from './tbl-address.model';
import { TblAddressService } from './tbl-address.service';

@Component({
    selector: 'jhi-tbl-address-detail',
    templateUrl: './tbl-address-detail.component.html'
})
export class TblAddressDetailComponent implements OnInit {

    tblAddress: TblAddress;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblAddressService: TblAddressService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblAddresses();
    }

    load(id) {
        this.tblAddressService.find(id).subscribe((tblAddress) => {
            this.tblAddress = tblAddress;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblAddresses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblAddressListModification',
            (response) => this.load(this.tblAddress.id)
        );
    }
}
