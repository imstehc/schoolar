import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblSchoolUserRole } from './tbl-school-user-role.model';
import { TblSchoolUserRolePopupService } from './tbl-school-user-role-popup.service';
import { TblSchoolUserRoleService } from './tbl-school-user-role.service';
import { TblRole, TblRoleService } from '../tbl-role';
import { TblSchool, TblSchoolService } from '../tbl-school';
import { TblUserDTO, TblUserService } from '../tbl-user';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-school-user-role-dialog',
    templateUrl: './tbl-school-user-role-dialog.component.html'
})
export class TblSchoolUserRoleDialogComponent implements OnInit {

    tblSchoolUserRole: TblSchoolUserRole;
    isSaving: boolean;

    tblroles: TblRole[];

    tblschools: TblSchool[];

    tblusers: TblUserDTO[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tblSchoolUserRoleService: TblSchoolUserRoleService,
        private tblRoleService: TblRoleService,
        private tblSchoolService: TblSchoolService,
        private tblUserService: TblUserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tblRoleService.query()
            .subscribe((res: ResponseWrapper) => { this.tblroles = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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
        if (this.tblSchoolUserRole.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblSchoolUserRoleService.update(this.tblSchoolUserRole));
        } else {
            this.subscribeToSaveResponse(
                this.tblSchoolUserRoleService.create(this.tblSchoolUserRole));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblSchoolUserRole>) {
        result.subscribe((res: TblSchoolUserRole) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblSchoolUserRole) {
        this.eventManager.broadcast({ name: 'tblSchoolUserRoleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTblRoleById(index: number, item: TblRole) {
        return item.id;
    }

    trackTblSchoolById(index: number, item: TblSchool) {
        return item.id;
    }

    trackTblUserById(index: number, item: TblUserDTO) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tbl-school-user-role-popup',
    template: ''
})
export class TblSchoolUserRolePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblSchoolUserRolePopupService: TblSchoolUserRolePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblSchoolUserRolePopupService
                    .open(TblSchoolUserRoleDialogComponent as Component, params['id']);
            } else {
                this.tblSchoolUserRolePopupService
                    .open(TblSchoolUserRoleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
