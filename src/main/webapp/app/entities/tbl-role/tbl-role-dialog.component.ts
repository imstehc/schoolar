import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblRole } from './tbl-role.model';
import { TblRolePopupService } from './tbl-role-popup.service';
import { TblRoleService } from './tbl-role.service';

@Component({
    selector: 'jhi-tbl-role-dialog',
    templateUrl: './tbl-role-dialog.component.html'
})
export class TblRoleDialogComponent implements OnInit {

    tblRole: TblRole;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private tblRoleService: TblRoleService,
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
        if (this.tblRole.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblRoleService.update(this.tblRole));
        } else {
            this.subscribeToSaveResponse(
                this.tblRoleService.create(this.tblRole));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblRole>) {
        result.subscribe((res: TblRole) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblRole) {
        this.eventManager.broadcast({ name: 'tblRoleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tbl-role-popup',
    template: ''
})
export class TblRolePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblRolePopupService: TblRolePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblRolePopupService
                    .open(TblRoleDialogComponent as Component, params['id']);
            } else {
                this.tblRolePopupService
                    .open(TblRoleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
