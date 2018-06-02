import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblLevelType } from './tbl-level-type.model';
import { TblLevelTypePopupService } from './tbl-level-type-popup.service';
import { TblLevelTypeService } from './tbl-level-type.service';

@Component({
    selector: 'jhi-tbl-level-type-dialog',
    templateUrl: './tbl-level-type-dialog.component.html'
})
export class TblLevelTypeDialogComponent implements OnInit {

    tblLevelType: TblLevelType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private tblLevelTypeService: TblLevelTypeService,
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
        if (this.tblLevelType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblLevelTypeService.update(this.tblLevelType));
        } else {
            this.subscribeToSaveResponse(
                this.tblLevelTypeService.create(this.tblLevelType));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblLevelType>) {
        result.subscribe((res: TblLevelType) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblLevelType) {
        this.eventManager.broadcast({ name: 'tblLevelTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tbl-level-type-popup',
    template: ''
})
export class TblLevelTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblLevelTypePopupService: TblLevelTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblLevelTypePopupService
                    .open(TblLevelTypeDialogComponent as Component, params['id']);
            } else {
                this.tblLevelTypePopupService
                    .open(TblLevelTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
