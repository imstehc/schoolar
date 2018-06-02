import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblSchoolSetting } from './tbl-school-setting.model';
import { TblSchoolSettingService } from './tbl-school-setting.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-school-setting',
    templateUrl: './tbl-school-setting.component.html'
})
export class TblSchoolSettingComponent implements OnInit {
tblSchoolSettings: TblSchoolSetting[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblSchoolSettingService: TblSchoolSettingService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblSchoolSettingService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblSchoolSettings = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblSchoolSettings();
    }

    trackId(index: number, item: TblSchoolSetting) {
        return item.id;
    }
    registerChangeInTblSchoolSettings() {
        this.eventSubscriber = this.eventManager.subscribe('tblSchoolSettingListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
