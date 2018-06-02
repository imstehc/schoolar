import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblSchoolHistory } from './tbl-school-history.model';
import { TblSchoolHistoryPopupService } from './tbl-school-history-popup.service';
import { TblSchoolHistoryService } from './tbl-school-history.service';
import { TblSchool, TblSchoolService } from '../tbl-school';
import { TblUserDTO, TblUserService } from '../tbl-user';
import { TblAudienceClient, TblAudienceClientService } from '../tbl-audience-client';
import { TblGeneralProcedureType, TblGeneralProcedureTypeService } from '../tbl-general-procedure-type';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-school-history-dialog',
    templateUrl: './tbl-school-history-dialog.component.html'
})
export class TblSchoolHistoryDialogComponent implements OnInit {

    tblSchoolHistory: TblSchoolHistory;
    isSaving: boolean;

    tblschools: TblSchool[];

    tblusers: TblUserDTO[];

    tblaudienceclients: TblAudienceClient[];

    tblgeneralproceduretypes: TblGeneralProcedureType[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tblSchoolHistoryService: TblSchoolHistoryService,
        private tblSchoolService: TblSchoolService,
        private tblUserService: TblUserService,
        private tblAudienceClientService: TblAudienceClientService,
        private tblGeneralProcedureTypeService: TblGeneralProcedureTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tblSchoolService.query()
            .subscribe((res: ResponseWrapper) => { this.tblschools = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tblUserService.query()
            .subscribe((res: ResponseWrapper) => { this.tblusers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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
        if (this.tblSchoolHistory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblSchoolHistoryService.update(this.tblSchoolHistory));
        } else {
            this.subscribeToSaveResponse(
                this.tblSchoolHistoryService.create(this.tblSchoolHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblSchoolHistory>) {
        result.subscribe((res: TblSchoolHistory) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblSchoolHistory) {
        this.eventManager.broadcast({ name: 'tblSchoolHistoryListModification', content: 'OK'});
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

    trackTblUserById(index: number, item: TblUserDTO) {
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
    selector: 'jhi-tbl-school-history-popup',
    template: ''
})
export class TblSchoolHistoryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblSchoolHistoryPopupService: TblSchoolHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblSchoolHistoryPopupService
                    .open(TblSchoolHistoryDialogComponent as Component, params['id']);
            } else {
                this.tblSchoolHistoryPopupService
                    .open(TblSchoolHistoryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
