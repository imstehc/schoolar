import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblSchoolSubject } from './tbl-school-subject.model';
import { TblSchoolSubjectPopupService } from './tbl-school-subject-popup.service';
import { TblSchoolSubjectService } from './tbl-school-subject.service';
import { TblLevelType, TblLevelTypeService } from '../tbl-level-type';
import { TblSubject, TblSubjectService } from '../tbl-subject';
import { TblSchool, TblSchoolService } from '../tbl-school';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-school-subject-dialog',
    templateUrl: './tbl-school-subject-dialog.component.html'
})
export class TblSchoolSubjectDialogComponent implements OnInit {

    tblSchoolSubject: TblSchoolSubject;
    isSaving: boolean;

    tblleveltypes: TblLevelType[];

    tblsubjects: TblSubject[];

    tblschools: TblSchool[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tblSchoolSubjectService: TblSchoolSubjectService,
        private tblLevelTypeService: TblLevelTypeService,
        private tblSubjectService: TblSubjectService,
        private tblSchoolService: TblSchoolService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tblLevelTypeService.query()
            .subscribe((res: ResponseWrapper) => { this.tblleveltypes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tblSubjectService.query()
            .subscribe((res: ResponseWrapper) => { this.tblsubjects = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tblSchoolService.query()
            .subscribe((res: ResponseWrapper) => { this.tblschools = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tblSchoolSubject.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblSchoolSubjectService.update(this.tblSchoolSubject));
        } else {
            this.subscribeToSaveResponse(
                this.tblSchoolSubjectService.create(this.tblSchoolSubject));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblSchoolSubject>) {
        result.subscribe((res: TblSchoolSubject) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblSchoolSubject) {
        this.eventManager.broadcast({ name: 'tblSchoolSubjectListModification', content: 'OK'});
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

    trackTblSubjectById(index: number, item: TblSubject) {
        return item.id;
    }

    trackTblSchoolById(index: number, item: TblSchool) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tbl-school-subject-popup',
    template: ''
})
export class TblSchoolSubjectPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblSchoolSubjectPopupService: TblSchoolSubjectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblSchoolSubjectPopupService
                    .open(TblSchoolSubjectDialogComponent as Component, params['id']);
            } else {
                this.tblSchoolSubjectPopupService
                    .open(TblSchoolSubjectDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
