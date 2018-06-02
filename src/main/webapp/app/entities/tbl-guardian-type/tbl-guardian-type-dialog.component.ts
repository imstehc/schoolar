import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblGuardianType } from './tbl-guardian-type.model';
import { TblGuardianTypePopupService } from './tbl-guardian-type-popup.service';
import { TblGuardianTypeService } from './tbl-guardian-type.service';

@Component({
    selector: 'jhi-tbl-guardian-type-dialog',
    templateUrl: './tbl-guardian-type-dialog.component.html'
})
export class TblGuardianTypeDialogComponent implements OnInit {

    tblGuardianType: TblGuardianType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private tblGuardianTypeService: TblGuardianTypeService,
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
        if (this.tblGuardianType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblGuardianTypeService.update(this.tblGuardianType));
        } else {
            this.subscribeToSaveResponse(
                this.tblGuardianTypeService.create(this.tblGuardianType));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblGuardianType>) {
        result.subscribe((res: TblGuardianType) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblGuardianType) {
        this.eventManager.broadcast({ name: 'tblGuardianTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tbl-guardian-type-popup',
    template: ''
})
export class TblGuardianTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblGuardianTypePopupService: TblGuardianTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblGuardianTypePopupService
                    .open(TblGuardianTypeDialogComponent as Component, params['id']);
            } else {
                this.tblGuardianTypePopupService
                    .open(TblGuardianTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
