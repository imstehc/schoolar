import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblShiftType } from './tbl-shift-type.model';
import { TblShiftTypePopupService } from './tbl-shift-type-popup.service';
import { TblShiftTypeService } from './tbl-shift-type.service';

@Component({
    selector: 'jhi-tbl-shift-type-dialog',
    templateUrl: './tbl-shift-type-dialog.component.html'
})
export class TblShiftTypeDialogComponent implements OnInit {

    tblShiftType: TblShiftType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private tblShiftTypeService: TblShiftTypeService,
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
        if (this.tblShiftType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblShiftTypeService.update(this.tblShiftType));
        } else {
            this.subscribeToSaveResponse(
                this.tblShiftTypeService.create(this.tblShiftType));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblShiftType>) {
        result.subscribe((res: TblShiftType) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblShiftType) {
        this.eventManager.broadcast({ name: 'tblShiftTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tbl-shift-type-popup',
    template: ''
})
export class TblShiftTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblShiftTypePopupService: TblShiftTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblShiftTypePopupService
                    .open(TblShiftTypeDialogComponent as Component, params['id']);
            } else {
                this.tblShiftTypePopupService
                    .open(TblShiftTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
