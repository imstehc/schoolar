import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblAudienceClient } from './tbl-audience-client.model';
import { TblAudienceClientService } from './tbl-audience-client.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-audience-client',
    templateUrl: './tbl-audience-client.component.html'
})
export class TblAudienceClientComponent implements OnInit {
tblAudienceClients: TblAudienceClient[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblAudienceClientService: TblAudienceClientService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblAudienceClientService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblAudienceClients = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblAudienceClients();
    }

    trackId(index: number, item: TblAudienceClient) {
        return item.id;
    }
    registerChangeInTblAudienceClients() {
        this.eventSubscriber = this.eventManager.subscribe('tblAudienceClientListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
