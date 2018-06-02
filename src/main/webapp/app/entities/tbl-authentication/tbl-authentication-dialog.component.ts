import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblAuthentication } from './tbl-authentication.model';
import { TblAuthenticationPopupService } from './tbl-authentication-popup.service';
import { TblAuthenticationService } from './tbl-authentication.service';

@Component({
    selector: 'jhi-tbl-authentication-dialog',
    templateUrl: './tbl-authentication-dialog.component.html'
})
export class TblAuthenticationDialogComponent implements OnInit {

    tblAuthentication: TblAuthentication;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private tblAuthenticationService: TblAuthenticationService,
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
        if (this.tblAuthentication.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblAuthenticationService.update(this.tblAuthentication));
        } else {
            this.subscribeToSaveResponse(
                this.tblAuthenticationService.create(this.tblAuthentication));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblAuthentication>) {
        result.subscribe((res: TblAuthentication) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblAuthentication) {
        this.eventManager.broadcast({ name: 'tblAuthenticationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tbl-authentication-popup',
    template: ''
})
export class TblAuthenticationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblAuthenticationPopupService: TblAuthenticationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblAuthenticationPopupService
                    .open(TblAuthenticationDialogComponent as Component, params['id']);
            } else {
                this.tblAuthenticationPopupService
                    .open(TblAuthenticationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
