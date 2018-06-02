import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblGuardian } from './tbl-guardian.model';
import { TblGuardianPopupService } from './tbl-guardian-popup.service';
import { TblGuardianService } from './tbl-guardian.service';

@Component({
    selector: 'jhi-tbl-guardian-delete-dialog',
    templateUrl: './tbl-guardian-delete-dialog.component.html'
})
export class TblGuardianDeleteDialogComponent {

    tblGuardian: TblGuardian;

    constructor(
        private tblGuardianService: TblGuardianService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblGuardianService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblGuardianListModification',
                content: 'Deleted an tblGuardian'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-guardian-delete-popup',
    template: ''
})
export class TblGuardianDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblGuardianPopupService: TblGuardianPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblGuardianPopupService
                .open(TblGuardianDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
