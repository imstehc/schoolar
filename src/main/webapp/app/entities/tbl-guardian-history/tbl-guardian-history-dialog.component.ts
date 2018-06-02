import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblGuardianHistory } from './tbl-guardian-history.model';
import { TblGuardianHistoryPopupService } from './tbl-guardian-history-popup.service';
import { TblGuardianHistoryService } from './tbl-guardian-history.service';
import { TblUserDTO, TblUserService } from '../tbl-user';
import { TblGuardianType, TblGuardianTypeService } from '../tbl-guardian-type';
import { TblAudienceClient, TblAudienceClientService } from '../tbl-audience-client';
import { TblGeneralProcedureType, TblGeneralProcedureTypeService } from '../tbl-general-procedure-type';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-guardian-history-dialog',
    templateUrl: './tbl-guardian-history-dialog.component.html'
})
export class TblGuardianHistoryDialogComponent implements OnInit {

    tblGuardianHistory: TblGuardianHistory;
    isSaving: boolean;

    tblusers: TblUserDTO[];

    tblguardiantypes: TblGuardianType[];

    tblaudienceclients: TblAudienceClient[];

    tblgeneralproceduretypes: TblGeneralProcedureType[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tblGuardianHistoryService: TblGuardianHistoryService,
        private tblUserService: TblUserService,
        private tblGuardianTypeService: TblGuardianTypeService,
        private tblAudienceClientService: TblAudienceClientService,
        private tblGeneralProcedureTypeService: TblGeneralProcedureTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tblUserService.query()
            .subscribe((res: ResponseWrapper) => { this.tblusers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tblGuardianTypeService.query()
            .subscribe((res: ResponseWrapper) => { this.tblguardiantypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tblAudienceClientService.query()
            .subscribe((res: ResponseWrapper) => { this.tblaudienceclients = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tblGeneralProcedureTypeService.query()
            .subscribe((res: ResponseWrapper) => { this.tblgeneralproceduretypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tblGuardianHistory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblGuardianHistoryService.update(this.tblGuardianHistory));
        } else {
            this.subscribeToSaveResponse(
                this.tblGuardianHistoryService.create(this.tblGuardianHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblGuardianHistory>) {
        result.subscribe((res: TblGuardianHistory) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblGuardianHistory) {
        this.eventManager.broadcast({ name: 'tblGuardianHistoryListModification', content: 'OK'});
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

    trackTblGuardianTypeById(index: number, item: TblGuardianType) {
        return item.id;
    }

    trackTblAudienceClientById(index: number, item: TblAudienceClient) {
        return item.id;
    }

    trackTblGeneralProcedureTypeById(index: number, item: TblGeneralProcedureType) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tbl-guardian-history-popup',
    template: ''
})
export class TblGuardianHistoryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblGuardianHistoryPopupService: TblGuardianHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblGuardianHistoryPopupService
                    .open(TblGuardianHistoryDialogComponent as Component, params['id']);
            } else {
                this.tblGuardianHistoryPopupService
                    .open(TblGuardianHistoryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
