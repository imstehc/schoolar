import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblSchoolUser } from './tbl-school-user.model';
import { TblSchoolUserPopupService } from './tbl-school-user-popup.service';
import { TblSchoolUserService } from './tbl-school-user.service';
import { TblSchool, TblSchoolService } from '../tbl-school';
import { TblUserDTO, TblUserService } from '../tbl-user';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-school-user-dialog',
    templateUrl: './tbl-school-user-dialog.component.html'
})
export class TblSchoolUserDialogComponent implements OnInit {

    tblSchoolUser: TblSchoolUser;
    isSaving: boolean;

    tblschools: TblSchool[];

    tblusers: TblUserDTO[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tblSchoolUserService: TblSchoolUserService,
        private tblSchoolService: TblSchoolService,
        private tblUserService: TblUserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tblSchoolService.query()
            .subscribe((res: ResponseWrapper) => { this.tblschools = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tblUserService.query()
            .subscribe((res: ResponseWrapper) => { this.tblusers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tblSchoolUser.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblSchoolUserService.update(this.tblSchoolUser));
        } else {
            this.subscribeToSaveResponse(
                this.tblSchoolUserService.create(this.tblSchoolUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblSchoolUser>) {
        result.subscribe((res: TblSchoolUser) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblSchoolUser) {
        this.eventManager.broadcast({ name: 'tblSchoolUserListModification', content: 'OK'});
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

    trackTblUserById(index: number, item: TblUserDTO) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tbl-school-user-popup',
    template: ''
})
export class TblSchoolUserPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblSchoolUserPopupService: TblSchoolUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblSchoolUserPopupService
                    .open(TblSchoolUserDialogComponent as Component, params['id']);
            } else {
                this.tblSchoolUserPopupService
                    .open(TblSchoolUserDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
