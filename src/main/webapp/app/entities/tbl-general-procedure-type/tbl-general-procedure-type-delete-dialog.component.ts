import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblGeneralProcedureType } from './tbl-general-procedure-type.model';
import { TblGeneralProcedureTypePopupService } from './tbl-general-procedure-type-popup.service';
import { TblGeneralProcedureTypeService } from './tbl-general-procedure-type.service';

@Component({
    selector: 'jhi-tbl-general-procedure-type-delete-dialog',
    templateUrl: './tbl-general-procedure-type-delete-dialog.component.html'
})
export class TblGeneralProcedureTypeDeleteDialogComponent {

    tblGeneralProcedureType: TblGeneralProcedureType;

    constructor(
        private tblGeneralProcedureTypeService: TblGeneralProcedureTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblGeneralProcedureTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblGeneralProcedureTypeListModification',
                content: 'Deleted an tblGeneralProcedureType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-general-procedure-type-delete-popup',
    template: ''
})
export class TblGeneralProcedureTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblGeneralProcedureTypePopupService: TblGeneralProcedureTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblGeneralProcedureTypePopupService
                .open(TblGeneralProcedureTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
