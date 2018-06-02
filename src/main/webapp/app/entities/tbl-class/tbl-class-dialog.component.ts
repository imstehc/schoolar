import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblClass } from './tbl-class.model';
import { TblClassPopupService } from './tbl-class-popup.service';
import { TblClassService } from './tbl-class.service';
import { TblSchool, TblSchoolService } from '../tbl-school';
import { TblShiftType, TblShiftTypeService } from '../tbl-shift-type';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-class-dialog',
    templateUrl: './tbl-class-dialog.component.html'
})
export class TblClassDialogComponent implements OnInit {

    tblClass: TblClass;
    isSaving: boolean;

    tblschools: TblSchool[];

    tblshifttypes: TblShiftType[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tblClassService: TblClassService,
        private tblSchoolService: TblSchoolService,
        private tblShiftTypeService: TblShiftTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tblSchoolService.query()
            .subscribe((res: ResponseWrapper) => { this.tblschools = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tblShiftTypeService.query()
            .subscribe((res: ResponseWrapper) => { this.tblshifttypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tblClass.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblClassService.update(this.tblClass));
        } else {
            this.subscribeToSaveResponse(
                this.tblClassService.create(this.tblClass));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblClass>) {
        result.subscribe((res: TblClass) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblClass) {
        this.eventManager.broadcast({ name: 'tblClassListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTblSchoolById(index: number, item: TblSchool) {
        return item.id;
    }

    trackTblShiftTypeById(index: number, item: TblShiftType) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tbl-class-popup',
    template: ''
})
export class TblClassPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblClassPopupService: TblClassPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblClassPopupService
                    .open(TblClassDialogComponent as Component, params['id']);
            } else {
                this.tblClassPopupService
                    .open(TblClassDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
