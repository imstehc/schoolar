import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblGeneralProcedureType } from './tbl-general-procedure-type.model';
import { TblGeneralProcedureTypeService } from './tbl-general-procedure-type.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-general-procedure-type',
    templateUrl: './tbl-general-procedure-type.component.html'
})
export class TblGeneralProcedureTypeComponent implements OnInit {
tblGeneralProcedureTypes: TblGeneralProcedureType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblGeneralProcedureTypeService: TblGeneralProcedureTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblGeneralProcedureTypeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblGeneralProcedureTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblGeneralProcedureTypes();
    }

    trackId(index: number, item: TblGeneralProcedureType) {
        return item.id;
    }
    registerChangeInTblGeneralProcedureTypes() {
        this.eventSubscriber = this.eventManager.subscribe('tblGeneralProcedureTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
