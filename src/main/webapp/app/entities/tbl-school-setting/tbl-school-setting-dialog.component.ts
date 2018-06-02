import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblSchoolSetting } from './tbl-school-setting.model';
import { TblSchoolSettingPopupService } from './tbl-school-setting-popup.service';
import { TblSchoolSettingService } from './tbl-school-setting.service';

@Component({
    selector: 'jhi-tbl-school-setting-dialog',
    templateUrl: './tbl-school-setting-dialog.component.html'
})
export class TblSchoolSettingDialogComponent implements OnInit {

    tblSchoolSetting: TblSchoolSetting;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private tblSchoolSettingService: TblSchoolSettingService,
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
        if (this.tblSchoolSetting.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblSchoolSettingService.update(this.tblSchoolSetting));
        } else {
            this.subscribeToSaveResponse(
                this.tblSchoolSettingService.create(this.tblSchoolSetting));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblSchoolSetting>) {
        result.subscribe((res: TblSchoolSetting) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblSchoolSetting) {
        this.eventManager.broadcast({ name: 'tblSchoolSettingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tbl-school-setting-popup',
    template: ''
})
export class TblSchoolSettingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblSchoolSettingPopupService: TblSchoolSettingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblSchoolSettingPopupService
                    .open(TblSchoolSettingDialogComponent as Component, params['id']);
            } else {
                this.tblSchoolSettingPopupService
                    .open(TblSchoolSettingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
