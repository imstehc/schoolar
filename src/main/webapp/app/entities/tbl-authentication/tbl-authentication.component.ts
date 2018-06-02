import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblAuthentication } from './tbl-authentication.model';
import { TblAuthenticationService } from './tbl-authentication.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-authentication',
    templateUrl: './tbl-authentication.component.html'
})
export class TblAuthenticationComponent implements OnInit {
tblAuthentications: TblAuthentication[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblAuthenticationService: TblAuthenticationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblAuthenticationService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblAuthentications = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblAuthentications();
    }

    trackId(index: number, item: TblAuthentication) {
        return item.id;
    }
    registerChangeInTblAuthentications() {
        this.eventSubscriber = this.eventManager.subscribe('tblAuthenticationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
