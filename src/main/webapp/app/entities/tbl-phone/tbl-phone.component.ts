import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblPhone } from './tbl-phone.model';
import { TblPhoneService } from './tbl-phone.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-phone',
    templateUrl: './tbl-phone.component.html'
})
export class TblPhoneComponent implements OnInit {
tblPhones: TblPhone[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblPhoneService: TblPhoneService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblPhoneService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblPhones = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblPhones();
    }

    trackId(index: number, item: TblPhone) {
        return item.id;
    }
    registerChangeInTblPhones() {
        this.eventSubscriber = this.eventManager.subscribe('tblPhoneListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
