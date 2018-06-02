import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblAuthenticate } from './tbl-authenticate.model';
import { TblAuthenticateService } from './tbl-authenticate.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-authenticate',
    templateUrl: './tbl-authenticate.component.html'
})
export class TblAuthenticateComponent implements OnInit {
tblAuthenticates: TblAuthenticate[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblAuthenticateService: TblAuthenticateService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblAuthenticateService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblAuthenticates = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblAuthenticates();
    }

    trackId(index: number, item: TblAuthenticate) {
        return item.id;
    }
    registerChangeInTblAuthenticates() {
        this.eventSubscriber = this.eventManager.subscribe('tblAuthenticateListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
