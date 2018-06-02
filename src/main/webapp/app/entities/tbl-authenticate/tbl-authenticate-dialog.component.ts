import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblAuthenticate } from './tbl-authenticate.model';
import { TblAuthenticatePopupService } from './tbl-authenticate-popup.service';
import { TblAuthenticateService } from './tbl-authenticate.service';
import { TblAudienceClient, TblAudienceClientService } from '../tbl-audience-client';
import { TblUserDTO, TblUserService } from '../tbl-user';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-authenticate-dialog',
    templateUrl: './tbl-authenticate-dialog.component.html'
})
export class TblAuthenticateDialogComponent implements OnInit {

    tblAuthenticate: TblAuthenticate;
    isSaving: boolean;

    tblaudienceclients: TblAudienceClient[];

    tblusers: TblUserDTO[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tblAuthenticateService: TblAuthenticateService,
        private tblAudienceClientService: TblAudienceClientService,
        private tblUserService: TblUserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tblAudienceClientService.query()
            .subscribe((res: ResponseWrapper) => { this.tblaudienceclients = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tblUserService.query()
            .subscribe((res: ResponseWrapper) => { this.tblusers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tblAuthenticate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblAuthenticateService.update(this.tblAuthenticate));
        } else {
            this.subscribeToSaveResponse(
                this.tblAuthenticateService.create(this.tblAuthenticate));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblAuthenticate>) {
        result.subscribe((res: TblAuthenticate) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblAuthenticate) {
        this.eventManager.broadcast({ name: 'tblAuthenticateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTblAudienceClientById(index: number, item: TblAudienceClient) {
        return item.id;
    }

    trackTblUserById(index: number, item: TblUserDTO) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tbl-authenticate-popup',
    template: ''
})
export class TblAuthenticatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblAuthenticatePopupService: TblAuthenticatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblAuthenticatePopupService
                    .open(TblAuthenticateDialogComponent as Component, params['id']);
            } else {
                this.tblAuthenticatePopupService
                    .open(TblAuthenticateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
