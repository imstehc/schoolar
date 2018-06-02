import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblShiftType } from './tbl-shift-type.model';
import { TblShiftTypePopupService } from './tbl-shift-type-popup.service';
import { TblShiftTypeService } from './tbl-shift-type.service';

@Component({
    selector: 'jhi-tbl-shift-type-delete-dialog',
    templateUrl: './tbl-shift-type-delete-dialog.component.html'
})
export class TblShiftTypeDeleteDialogComponent {

    tblShiftType: TblShiftType;

    constructor(
        private tblShiftTypeService: TblShiftTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblShiftTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblShiftTypeListModification',
                content: 'Deleted an tblShiftType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-shift-type-delete-popup',
    template: ''
})
export class TblShiftTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblShiftTypePopupService: TblShiftTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblShiftTypePopupService
                .open(TblShiftTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
