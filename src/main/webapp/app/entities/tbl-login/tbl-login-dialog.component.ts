import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblLogin } from './tbl-login.model';
import { TblLoginPopupService } from './tbl-login-popup.service';
import { TblLoginService } from './tbl-login.service';
import { TblUserDTO, TblUserService } from '../tbl-user';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-login-dialog',
    templateUrl: './tbl-login-dialog.component.html'
})
export class TblLoginDialogComponent implements OnInit {

    tblLogin: TblLogin;
    isSaving: boolean;

    tblusers: TblUserDTO[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tblLoginService: TblLoginService,
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
        if (this.tblLogin.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblLoginService.update(this.tblLogin));
        } else {
            this.subscribeToSaveResponse(
                this.tblLoginService.create(this.tblLogin));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblLogin>) {
        result.subscribe((res: TblLogin) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblLogin) {
        this.eventManager.broadcast({ name: 'tblLoginListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.eventManager.broadcast({ name: 'tblLoginListModification', content: 'NOT_OK'});
        this.isSaving = false;
        this.activeModal.dismiss();
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTblUserById(index: number, item: TblUserDTO) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tbl-login-popup',
    template: ''
})
export class TblLoginPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblLoginPopupService: TblLoginPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblLoginPopupService
                    .open(TblLoginDialogComponent as Component, params['id']);
            } else {
                this.tblLoginPopupService
                    .open(TblLoginDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
