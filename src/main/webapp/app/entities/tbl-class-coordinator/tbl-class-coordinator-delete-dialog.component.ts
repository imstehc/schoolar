import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblClassCoordinator } from './tbl-class-coordinator.model';
import { TblClassCoordinatorPopupService } from './tbl-class-coordinator-popup.service';
import { TblClassCoordinatorService } from './tbl-class-coordinator.service';

@Component({
    selector: 'jhi-tbl-class-coordinator-delete-dialog',
    templateUrl: './tbl-class-coordinator-delete-dialog.component.html'
})
export class TblClassCoordinatorDeleteDialogComponent {

    tblClassCoordinator: TblClassCoordinator;

    constructor(
        private tblClassCoordinatorService: TblClassCoordinatorService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblClassCoordinatorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblClassCoordinatorListModification',
                content: 'Deleted an tblClassCoordinator'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-class-coordinator-delete-popup',
    template: ''
})
export class TblClassCoordinatorDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblClassCoordinatorPopupService: TblClassCoordinatorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblClassCoordinatorPopupService
                .open(TblClassCoordinatorDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
