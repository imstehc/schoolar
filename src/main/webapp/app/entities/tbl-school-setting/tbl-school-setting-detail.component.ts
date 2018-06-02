import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblSchoolSetting } from './tbl-school-setting.model';
import { TblSchoolSettingService } from './tbl-school-setting.service';

@Component({
    selector: 'jhi-tbl-school-setting-detail',
    templateUrl: './tbl-school-setting-detail.component.html'
})
export class TblSchoolSettingDetailComponent implements OnInit, OnDestroy {

    tblSchoolSetting: TblSchoolSetting;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblSchoolSettingService: TblSchoolSettingService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblSchoolSettings();
    }

    load(id) {
        this.tblSchoolSettingService.find(id).subscribe((tblSchoolSetting) => {
            this.tblSchoolSetting = tblSchoolSetting;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
       this.subscription.unsubscribe();
       this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTblSchoolSettings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblSchoolSettingListModification',
            (response) => this.load(this.tblSchoolSetting.id)
        );
    }
}
