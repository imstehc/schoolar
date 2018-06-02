import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblGuardianType } from './tbl-guardian-type.model';
import { TblGuardianTypePopupService } from './tbl-guardian-type-popup.service';
import { TblGuardianTypeService } from './tbl-guardian-type.service';

@Component({
    selector: 'jhi-tbl-guardian-type-delete-dialog',
    templateUrl: './tbl-guardian-type-delete-dialog.component.html'
})
export class TblGuardianTypeDeleteDialogComponent {

    tblGuardianType: TblGuardianType;

    constructor(
        private tblGuardianTypeService: TblGuardianTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblGuardianTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblGuardianTypeListModification',
                content: 'Deleted an tblGuardianType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-guardian-type-delete-popup',
    template: ''
})
export class TblGuardianTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblGuardianTypePopupService: TblGuardianTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblGuardianTypePopupService
                .open(TblGuardianTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
