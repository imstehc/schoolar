import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblClassStudent } from './tbl-class-student.model';
import { TblClassStudentPopupService } from './tbl-class-student-popup.service';
import { TblClassStudentService } from './tbl-class-student.service';
import { TblUserDTO, TblUserService } from '../tbl-user';
import { TblClass, TblClassService } from '../tbl-class';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-class-student-dialog',
    templateUrl: './tbl-class-student-dialog.component.html'
})
export class TblClassStudentDialogComponent implements OnInit {

    tblClassStudent: TblClassStudent;
    isSaving: boolean;

    tblusers: TblUserDTO[];

    tblclasses: TblClass[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tblClassStudentService: TblClassStudentService,
        private tblUserService: TblUserService,
        private tblClassService: TblClassService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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
        if (this.tblClassStudent.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblClassStudentService.update(this.tblClassStudent));
        } else {
            this.subscribeToSaveResponse(
                this.tblClassStudentService.create(this.tblClassStudent));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblClassStudent>) {
        result.subscribe((res: TblClassStudent) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblClassStudent) {
        this.eventManager.broadcast({ name: 'tblClassStudentListModification', content: 'OK'});
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

    trackTblClassById(index: number, item: TblClass) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tbl-class-student-popup',
    template: ''
})
export class TblClassStudentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblClassStudentPopupService: TblClassStudentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblClassStudentPopupService
                    .open(TblClassStudentDialogComponent as Component, params['id']);
            } else {
                this.tblClassStudentPopupService
                    .open(TblClassStudentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
