import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblLogin } from './tbl-login.model';
import { TblLoginService } from './tbl-login.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-login',
    templateUrl: './tbl-login.component.html'
})
export class TblLoginComponent implements OnInit {
tblLogins: TblLogin[];
    currentAccount: any;
    eventSubscriber: Subscription;
    creationResponse: String = '';

    constructor(
        private tblLoginService: TblLoginService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblLoginService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblLogins = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblLogins();
    }

    trackId(index: number, item: TblLogin) {
        return item.id;
    }
    registerChangeInTblLogins() {
        this.eventSubscriber = this.eventManager.subscribe('tblLoginListModification', (response) => {
            this.creationResponse = response.content;

            setTimeout(() => {
                this.creationResponse = '';
            }, 3000);
        });
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
