import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblClass } from './tbl-class.model';
import { TblClassService } from './tbl-class.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-class',
    templateUrl: './tbl-class.component.html'
})
export class TblClassComponent implements OnInit {
tblClasses: TblClass[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblClassService: TblClassService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblClassService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblClasses = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblClasses();
    }

    trackId(index: number, item: TblClass) {
        return item.id;
    }
    registerChangeInTblClasses() {
        this.eventSubscriber = this.eventManager.subscribe('tblClassListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
