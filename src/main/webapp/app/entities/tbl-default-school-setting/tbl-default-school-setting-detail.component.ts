import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblDefaultSchoolSetting } from './tbl-default-school-setting.model';
import { TblDefaultSchoolSettingService } from './tbl-default-school-setting.service';

@Component({
    selector: 'jhi-tbl-default-school-setting-detail',
    templateUrl: './tbl-default-school-setting-detail.component.html'
})
export class TblDefaultSchoolSettingDetailComponent implements OnInit {

    tblDefaultSchoolSetting: TblDefaultSchoolSetting;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblDefaultSchoolSettingService: TblDefaultSchoolSettingService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblDefaultSchoolSettings();
    }

    load(id) {
        this.tblDefaultSchoolSettingService.find(id).subscribe((tblDefaultSchoolSetting) => {
            this.tblDefaultSchoolSetting = tblDefaultSchoolSetting;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblDefaultSchoolSettings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblDefaultSchoolSettingListModification',
            (response) => this.load(this.tblDefaultSchoolSetting.id)
        );
    }
}
