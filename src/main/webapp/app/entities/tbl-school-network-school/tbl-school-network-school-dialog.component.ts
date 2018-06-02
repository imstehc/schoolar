import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblSchoolNetworkSchool } from './tbl-school-network-school.model';
import { TblSchoolNetworkSchoolPopupService } from './tbl-school-network-school-popup.service';
import { TblSchoolNetworkSchoolService } from './tbl-school-network-school.service';
import { TblSchool, TblSchoolService } from '../tbl-school';
import { TblSchoolNetwork, TblSchoolNetworkService } from '../tbl-school-network';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-school-network-school-dialog',
    templateUrl: './tbl-school-network-school-dialog.component.html'
})
export class TblSchoolNetworkSchoolDialogComponent implements OnInit {

    tblSchoolNetworkSchool: TblSchoolNetworkSchool;
    isSaving: boolean;

    tblschools: TblSchool[];

    tblschoolnetworks: TblSchoolNetwork[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tblSchoolNetworkSchoolService: TblSchoolNetworkSchoolService,
        private tblSchoolService: TblSchoolService,
        private tblSchoolNetworkService: TblSchoolNetworkService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tblSchoolService.query()
            .subscribe((res: ResponseWrapper) => { this.tblschools = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tblSchoolNetworkService.query()
            .subscribe((res: ResponseWrapper) => { this.tblschoolnetworks = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tblSchoolNetworkSchool.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblSchoolNetworkSchoolService.update(this.tblSchoolNetworkSchool));
        } else {
            this.subscribeToSaveResponse(
                this.tblSchoolNetworkSchoolService.create(this.tblSchoolNetworkSchool));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblSchoolNetworkSchool>) {
        result.subscribe((res: TblSchoolNetworkSchool) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblSchoolNetworkSchool) {
        this.eventManager.broadcast({ name: 'tblSchoolNetworkSchoolListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTblSchoolById(index: number, item: TblSchool) {
        return item.id;
    }

    trackTblSchoolNetworkById(index: number, item: TblSchoolNetwork) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tbl-school-network-school-popup',
    template: ''
})
export class TblSchoolNetworkSchoolPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblSchoolNetworkSchoolPopupService: TblSchoolNetworkSchoolPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblSchoolNetworkSchoolPopupService
                    .open(TblSchoolNetworkSchoolDialogComponent as Component, params['id']);
            } else {
                this.tblSchoolNetworkSchoolPopupService
                    .open(TblSchoolNetworkSchoolDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
