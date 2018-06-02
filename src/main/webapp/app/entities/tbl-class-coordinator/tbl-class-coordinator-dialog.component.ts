import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblClassCoordinator } from './tbl-class-coordinator.model';
import { TblClassCoordinatorPopupService } from './tbl-class-coordinator-popup.service';
import { TblClassCoordinatorService } from './tbl-class-coordinator.service';
import { TblUserDTO, TblUserService } from '../tbl-user';
import { TblClass, TblClassService } from '../tbl-class';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-class-coordinator-dialog',
    templateUrl: './tbl-class-coordinator-dialog.component.html'
})
export class TblClassCoordinatorDialogComponent implements OnInit {

    tblClassCoordinator: TblClassCoordinator;
    isSaving: boolean;

    tblusers: TblUserDTO[];

    tblclasses: TblClass[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tblClassCoordinatorService: TblClassCoordinatorService,
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
        if (this.tblClassCoordinator.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tblClassCoordinatorService.update(this.tblClassCoordinator));
        } else {
            this.subscribeToSaveResponse(
                this.tblClassCoordinatorService.create(this.tblClassCoordinator));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblClassCoordinator>) {
        result.subscribe((res: TblClassCoordinator) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblClassCoordinator) {
        this.eventManager.broadcast({ name: 'tblClassCoordinatorListModification', content: 'OK'});
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
    selector: 'jhi-tbl-class-coordinator-popup',
    template: ''
})
export class TblClassCoordinatorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblClassCoordinatorPopupService: TblClassCoordinatorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tblClassCoordinatorPopupService
                    .open(TblClassCoordinatorDialogComponent as Component, params['id']);
            } else {
                this.tblClassCoordinatorPopupService
                    .open(TblClassCoordinatorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
