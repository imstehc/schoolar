import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblDefaultSchoolSetting } from './tbl-default-school-setting.model';
import { TblDefaultSchoolSettingService } from './tbl-default-school-setting.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-default-school-setting',
    templateUrl: './tbl-default-school-setting.component.html'
})
export class TblDefaultSchoolSettingComponent implements OnInit {
tblDefaultSchoolSettings: TblDefaultSchoolSetting[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblDefaultSchoolSettingService: TblDefaultSchoolSettingService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblDefaultSchoolSettingService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblDefaultSchoolSettings = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblDefaultSchoolSettings();
    }

    trackId(index: number, item: TblDefaultSchoolSetting) {
        return item.id;
    }
    registerChangeInTblDefaultSchoolSettings() {
        this.eventSubscriber = this.eventManager.subscribe('tblDefaultSchoolSettingListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
