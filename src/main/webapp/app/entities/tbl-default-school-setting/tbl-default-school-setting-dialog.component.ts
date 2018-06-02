import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblDefaultSchoolSetting } from './tbl-default-school-setting.model';
import { TblDefaultSchoolSettingPopupService } from './tbl-default-school-setting-popup.service';
import { TblDefaultSchoolSettingService } from './tbl-default-school-setting.service';

@Component({
    selector: 'jhi-tbl-default-school-setting-dialog',
    templateUrl: './tbl-default-school-setting-dialog.component.html'
})
export class TblDefaultSchoolSettingDialogComponent implements OnInit {

    tblDefaultSchoolSetting: TblDefaultSchoolSetting;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private tblDefaultSchoolSettingService: TblDefaultSchoolSettingService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tblDefaultSchoolSetting.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblDefaultSchoolSettingService.update(this.tblDefaultSchoolSetting));
        } else {
            this.subscribeToSaveResponse(
                this.tblDefaultSchoolSettingService.create(this.tblDefaultSchoolSetting));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblDefaultSchoolSetting>) {
        result.subscribe((res: TblDefaultSchoolSetting) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblDefaultSchoolSetting) {
        this.eventManager.broadcast({ name: 'tblDefaultSchoolSettingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tbl-default-school-setting-popup',
    template: ''
})
export class TblDefaultSchoolSettingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblDefaultSchoolSettingPopupService: TblDefaultSchoolSettingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblDefaultSchoolSettingPopupService
                    .open(TblDefaultSchoolSettingDialogComponent as Component, params['id']);
            } else {
                this.tblDefaultSchoolSettingPopupService
                    .open(TblDefaultSchoolSettingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
