import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblAudienceClient } from './tbl-audience-client.model';
import { TblAudienceClientPopupService } from './tbl-audience-client-popup.service';
import { TblAudienceClientService } from './tbl-audience-client.service';

@Component({
    selector: 'jhi-tbl-audience-client-dialog',
    templateUrl: './tbl-audience-client-dialog.component.html'
})
export class TblAudienceClientDialogComponent implements OnInit {

    tblAudienceClient: TblAudienceClient;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private tblAudienceClientService: TblAudienceClientService,
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
        if (this.tblAudienceClient.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblAudienceClientService.update(this.tblAudienceClient));
        } else {
            this.subscribeToSaveResponse(
                this.tblAudienceClientService.create(this.tblAudienceClient));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblAudienceClient>) {
        result.subscribe((res: TblAudienceClient) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblAudienceClient) {
        this.eventManager.broadcast({ name: 'tblAudienceClientListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tbl-audience-client-popup',
    template: ''
})
export class TblAudienceClientPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblAudienceClientPopupService: TblAudienceClientPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblAudienceClientPopupService
                    .open(TblAudienceClientDialogComponent as Component, params['id']);
            } else {
                this.tblAudienceClientPopupService
                    .open(TblAudienceClientDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
