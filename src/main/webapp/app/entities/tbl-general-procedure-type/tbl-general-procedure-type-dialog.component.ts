import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblGeneralProcedureType } from './tbl-general-procedure-type.model';
import { TblGeneralProcedureTypePopupService } from './tbl-general-procedure-type-popup.service';
import { TblGeneralProcedureTypeService } from './tbl-general-procedure-type.service';

@Component({
    selector: 'jhi-tbl-general-procedure-type-dialog',
    templateUrl: './tbl-general-procedure-type-dialog.component.html'
})
export class TblGeneralProcedureTypeDialogComponent implements OnInit {

    tblGeneralProcedureType: TblGeneralProcedureType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private tblGeneralProcedureTypeService: TblGeneralProcedureTypeService,
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
        if (this.tblGeneralProcedureType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblGeneralProcedureTypeService.update(this.tblGeneralProcedureType));
        } else {
            this.subscribeToSaveResponse(
                this.tblGeneralProcedureTypeService.create(this.tblGeneralProcedureType));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblGeneralProcedureType>) {
        result.subscribe((res: TblGeneralProcedureType) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblGeneralProcedureType) {
        this.eventManager.broadcast({ name: 'tblGeneralProcedureTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tbl-general-procedure-type-popup',
    template: ''
})
export class TblGeneralProcedureTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblGeneralProcedureTypePopupService: TblGeneralProcedureTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblGeneralProcedureTypePopupService
                    .open(TblGeneralProcedureTypeDialogComponent as Component, params['id']);
            } else {
                this.tblGeneralProcedureTypePopupService
                    .open(TblGeneralProcedureTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
