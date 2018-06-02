import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblGrade } from './tbl-grade.model';
import { TblGradePopupService } from './tbl-grade-popup.service';
import { TblGradeService } from './tbl-grade.service';
import { TblLevelType, TblLevelTypeService } from '../tbl-level-type';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-grade-dialog',
    templateUrl: './tbl-grade-dialog.component.html'
})
export class TblGradeDialogComponent implements OnInit {

    tblGrade: TblGrade;
    isSaving: boolean;

    tblleveltypes: TblLevelType[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tblGradeService: TblGradeService,
        private tblLevelTypeService: TblLevelTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tblLevelTypeService.query()
            .subscribe((res: ResponseWrapper) => { this.tblleveltypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tblGrade.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblGradeService.update(this.tblGrade));
        } else {
            this.subscribeToSaveResponse(
                this.tblGradeService.create(this.tblGrade));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblGrade>) {
        result.subscribe((res: TblGrade) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblGrade) {
        this.eventManager.broadcast({ name: 'tblGradeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTblLevelTypeById(index: number, item: TblLevelType) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tbl-grade-popup',
    template: ''
})
export class TblGradePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblGradePopupService: TblGradePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblGradePopupService
                    .open(TblGradeDialogComponent as Component, params['id']);
            } else {
                this.tblGradePopupService
                    .open(TblGradeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
