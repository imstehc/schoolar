import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblNfc } from './tbl-nfc.model';
import { TblNfcPopupService } from './tbl-nfc-popup.service';
import { TblNfcService } from './tbl-nfc.service';
import { TblUserDTO, TblUserService } from '../tbl-user';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-nfc-dialog',
    templateUrl: './tbl-nfc-dialog.component.html'
})
export class TblNfcDialogComponent implements OnInit {

    tblNfc: TblNfc;
    isSaving: boolean;

    tblusers: TblUserDTO[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tblNfcService: TblNfcService,
        private tblUserService: TblUserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tblUserService.query()
            .subscribe((res: ResponseWrapper) => { this.tblusers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tblNfc.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblNfcService.update(this.tblNfc));
        } else {
            this.subscribeToSaveResponse(
                this.tblNfcService.create(this.tblNfc));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblNfc>) {
        result.subscribe((res: TblNfc) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblNfc) {
        this.eventManager.broadcast({ name: 'tblNfcListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-tbl-nfc-popup',
    template: ''
})
export class TblNfcPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblNfcPopupService: TblNfcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblNfcPopupService
                    .open(TblNfcDialogComponent as Component, params['id']);
            } else {
                this.tblNfcPopupService
                    .open(TblNfcDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
