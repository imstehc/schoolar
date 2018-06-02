import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblPhone } from './tbl-phone.model';
import { TblPhonePopupService } from './tbl-phone-popup.service';
import { TblPhoneService } from './tbl-phone.service';
import { TblUserDTO, TblUserService } from '../tbl-user';
import { TblSchoolNetwork, TblSchoolNetworkService } from '../tbl-school-network';
import { TblSchool, TblSchoolService } from '../tbl-school';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-phone-dialog',
    templateUrl: './tbl-phone-dialog.component.html'
})
export class TblPhoneDialogComponent implements OnInit {

    tblPhone: TblPhone;
    isSaving: boolean;

    tblusers: TblUserDTO[];

    tblschoolnetworks: TblSchoolNetwork[];

    tblschools: TblSchool[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tblPhoneService: TblPhoneService,
        private tblUserService: TblUserService,
        private tblSchoolNetworkService: TblSchoolNetworkService,
        private tblSchoolService: TblSchoolService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tblUserService.query()
            .subscribe((res: ResponseWrapper) => { this.tblusers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tblSchoolNetworkService.query()
            .subscribe((res: ResponseWrapper) => { this.tblschoolnetworks = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tblSchoolService.query()
            .subscribe((res: ResponseWrapper) => { this.tblschools = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tblPhone.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblPhoneService.update(this.tblPhone));
        } else {
            this.subscribeToSaveResponse(
                this.tblPhoneService.create(this.tblPhone));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblPhone>) {
        result.subscribe((res: TblPhone) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblPhone) {
        this.eventManager.broadcast({ name: 'tblPhoneListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTblUserById(index: number, item: TblUserDTO) {
        return item.id;
    }

    trackTblSchoolNetworkById(index: number, item: TblSchoolNetwork) {
        return item.id;
    }

    trackTblSchoolById(index: number, item: TblSchool) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-tbl-phone-popup',
    template: ''
})
export class TblPhonePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblPhonePopupService: TblPhonePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblPhonePopupService
                    .open(TblPhoneDialogComponent as Component, params['id']);
            } else {
                this.tblPhonePopupService
                    .open(TblPhoneDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
