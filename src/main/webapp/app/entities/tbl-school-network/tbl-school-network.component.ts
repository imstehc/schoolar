import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblSchoolNetwork } from './tbl-school-network.model';
import { TblSchoolNetworkService } from './tbl-school-network.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-school-network',
    templateUrl: './tbl-school-network.component.html',
    styleUrls: ['scss/tbl-school-network.scss']
})
export class TblSchoolNetworkComponent implements OnInit {
tblSchoolNetworks: TblSchoolNetwork[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblSchoolNetworkService: TblSchoolNetworkService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblSchoolNetworkService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblSchoolNetworks = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblSchoolNetworks();
    }

    trackId(index: number, item: TblSchoolNetwork) {
        return item.id;
    }
    registerChangeInTblSchoolNetworks() {
        this.eventSubscriber = this.eventManager.subscribe('tblSchoolNetworkListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
