import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblSubject } from './tbl-subject.model';
import { TblSubjectPopupService } from './tbl-subject-popup.service';
import { TblSubjectService } from './tbl-subject.service';

@Component({
    selector: 'jhi-tbl-subject-dialog',
    templateUrl: './tbl-subject-dialog.component.html'
})
export class TblSubjectDialogComponent implements OnInit {

    tblSubject: TblSubject;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private tblSubjectService: TblSubjectService,
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
        if (this.tblSubject.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblSubjectService.update(this.tblSubject));
        } else {
            this.subscribeToSaveResponse(
                this.tblSubjectService.create(this.tblSubject));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblSubject>) {
        result.subscribe((res: TblSubject) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblSubject) {
        this.eventManager.broadcast({ name: 'tblSubjectListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tbl-subject-popup',
    template: ''
})
export class TblSubjectPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblSubjectPopupService: TblSubjectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblSubjectPopupService
                    .open(TblSubjectDialogComponent as Component, params['id']);
            } else {
                this.tblSubjectPopupService
                    .open(TblSubjectDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
