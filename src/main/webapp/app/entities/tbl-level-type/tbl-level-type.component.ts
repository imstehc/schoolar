import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblLevelType } from './tbl-level-type.model';
import { TblLevelTypeService } from './tbl-level-type.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-level-type',
    templateUrl: './tbl-level-type.component.html'
})
export class TblLevelTypeComponent implements OnInit {
tblLevelTypes: TblLevelType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblLevelTypeService: TblLevelTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblLevelTypeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblLevelTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblLevelTypes();
    }

    trackId(index: number, item: TblLevelType) {
        return item.id;
    }
    registerChangeInTblLevelTypes() {
        this.eventSubscriber = this.eventManager.subscribe('tblLevelTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
