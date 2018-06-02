import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblSchoolType } from './tbl-school-type.model';
import { TblSchoolTypePopupService } from './tbl-school-type-popup.service';
import { TblSchoolTypeService } from './tbl-school-type.service';
import { TblSchool, TblSchoolService } from '../tbl-school';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-school-type-dialog',
    templateUrl: './tbl-school-type-dialog.component.html'
})
export class TblSchoolTypeDialogComponent implements OnInit {

    tblSchoolType: TblSchoolType;
    isSaving: boolean;

    tblschools: TblSchool[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tblSchoolTypeService: TblSchoolTypeService,
        private tblSchoolService: TblSchoolService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tblSchoolService.query()
            .subscribe((res: ResponseWrapper) => { this.tblschools = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tblSchoolType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblSchoolTypeService.update(this.tblSchoolType));
        } else {
            this.subscribeToSaveResponse(
                this.tblSchoolTypeService.create(this.tblSchoolType));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblSchoolType>) {
        result.subscribe((res: TblSchoolType) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblSchoolType) {
        this.eventManager.broadcast({ name: 'tblSchoolTypeListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-tbl-school-type-popup',
    template: ''
})
export class TblSchoolTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblSchoolTypePopupService: TblSchoolTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblSchoolTypePopupService
                    .open(TblSchoolTypeDialogComponent as Component, params['id']);
            } else {
                this.tblSchoolTypePopupService
                    .open(TblSchoolTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
