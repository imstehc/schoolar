import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblGuardian } from '../tbl-guardian';
import { TblGuardianPopupService } from './tbl-guardian-popup.service';
import { TblGuardianService } from './tbl-guardian.service';
import { TblUserDTO, TblUserService } from '../tbl-user';
import { TblGuardianType, TblGuardianTypeService } from '../tbl-guardian-type';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-guardian-dialog',
    templateUrl: './tbl-guardian-dialog.component.html'
})
export class TblGuardianDialogComponent implements OnInit {

    tblGuardian: TblGuardian;
    isSaving: boolean;

    tblusers: TblUserDTO[];

    tblguardiantypes: TblGuardianType[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tblGuardianService: TblGuardianService,
        private tblUserService: TblUserService,
        private tblGuardianTypeService: TblGuardianTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tblUserService.query()
            .subscribe((res: ResponseWrapper) => { this.tblusers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tblGuardianTypeService.query()
            .subscribe((res: ResponseWrapper) => { this.tblguardiantypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tblGuardian.id !== undefined) {
        //     this.subscribeToSaveResponse(
        //     //    this.tblGuardianService.update(nll));
        // } else {
        //     this.subscribeToSaveResponse(
        //         //this.tblGuardianService.create(this.tblGuardian));
        // }
        }
    }

    private subscribeToSaveResponse(result: Observable<TblGuardian>) {
        result.subscribe((res: TblGuardian) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblGuardian) {
        this.eventManager.broadcast({ name: 'tblGuardianListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-tbl-guardian-popup',
    template: ''
})
export class TblGuardianPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblGuardianPopupService: TblGuardianPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblGuardianPopupService
                    .open(TblGuardianDialogComponent as Component, params['id']);
            } else {
                this.tblGuardianPopupService
                    .open(TblGuardianDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
