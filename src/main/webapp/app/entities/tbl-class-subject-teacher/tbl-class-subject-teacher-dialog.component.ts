import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblClassSubjectTeacher } from './tbl-class-subject-teacher.model';
import { TblClassSubjectTeacherPopupService } from './tbl-class-subject-teacher-popup.service';
import { TblClassSubjectTeacherService } from './tbl-class-subject-teacher.service';
import { TblSubject, TblSubjectService } from '../tbl-subject';
import { TblUserDTO, TblUserService } from '../tbl-user';
import { TblClass, TblClassService } from '../tbl-class';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-class-subject-teacher-dialog',
    templateUrl: './tbl-class-subject-teacher-dialog.component.html'
})
export class TblClassSubjectTeacherDialogComponent implements OnInit {

    tblClassSubjectTeacher: TblClassSubjectTeacher;
    isSaving: boolean;

    tblsubjects: TblSubject[];

    tblusers: TblUserDTO[];

    tblclasses: TblClass[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tblClassSubjectTeacherService: TblClassSubjectTeacherService,
        private tblSubjectService: TblSubjectService,
        private tblUserService: TblUserService,
        private tblClassService: TblClassService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tblSubjectService.query()
            .subscribe((res: ResponseWrapper) => { this.tblsubjects = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tblUserService.query()
            .subscribe((res: ResponseWrapper) => { this.tblusers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tblClassService.query()
            .subscribe((res: ResponseWrapper) => { this.tblclasses = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tblClassSubjectTeacher.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblClassSubjectTeacherService.update(this.tblClassSubjectTeacher));
        } else {
            this.subscribeToSaveResponse(
                this.tblClassSubjectTeacherService.create(this.tblClassSubjectTeacher));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblClassSubjectTeacher>) {
        result.subscribe((res: TblClassSubjectTeacher) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblClassSubjectTeacher) {
        this.eventManager.broadcast({ name: 'tblClassSubjectTeacherListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTblSubjectById(index: number, item: TblSubject) {
        return item.id;
    }

    trackTblUserById(index: number, item: TblUserDTO) {
        return item.id;
    }

    trackTblClassById(index: number, item: TblClass) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tbl-class-subject-teacher-popup',
    template: ''
})
export class TblClassSubjectTeacherPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblClassSubjectTeacherPopupService: TblClassSubjectTeacherPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblClassSubjectTeacherPopupService
                    .open(TblClassSubjectTeacherDialogComponent as Component, params['id']);
            } else {
                this.tblClassSubjectTeacherPopupService
                    .open(TblClassSubjectTeacherDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
