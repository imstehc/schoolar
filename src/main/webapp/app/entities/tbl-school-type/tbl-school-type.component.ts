import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblSchoolType } from './tbl-school-type.model';
import { TblSchoolTypeService } from './tbl-school-type.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-school-type',
    templateUrl: './tbl-school-type.component.html'
})
export class TblSchoolTypeComponent implements OnInit {
tblSchoolTypes: TblSchoolType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblSchoolTypeService: TblSchoolTypeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblSchoolTypeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblSchoolTypes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblSchoolTypes();
    }

    trackId(index: number, item: TblSchoolType) {
        return item.id;
    }
    registerChangeInTblSchoolTypes() {
        this.eventSubscriber = this.eventManager.subscribe('tblSchoolTypeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
