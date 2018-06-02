import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblShiftType } from './tbl-shift-type.model';
import { TblShiftTypeService } from './tbl-shift-type.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-shift-type',
    templateUrl: './tbl-shift-type.component.html'
})
export class TblShiftTypeComponent implements OnInit {
tblShiftTypes: TblShiftType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblShiftTypeService: TblShiftTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblShiftTypeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblShiftTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblShiftTypes();
    }

    trackId(index: number, item: TblShiftType) {
        return item.id;
    }
    registerChangeInTblShiftTypes() {
        this.eventSubscriber = this.eventManager.subscribe('tblShiftTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
