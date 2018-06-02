import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblLevelType } from './tbl-level-type.model';
import { TblLevelTypePopupService } from './tbl-level-type-popup.service';
import { TblLevelTypeService } from './tbl-level-type.service';

@Component({
    selector: 'jhi-tbl-level-type-delete-dialog',
    templateUrl: './tbl-level-type-delete-dialog.component.html'
})
export class TblLevelTypeDeleteDialogComponent {

    tblLevelType: TblLevelType;

    constructor(
        private tblLevelTypeService: TblLevelTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblLevelTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblLevelTypeListModification',
                content: 'Deleted an tblLevelType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-level-type-delete-popup',
    template: ''
})
export class TblLevelTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblLevelTypePopupService: TblLevelTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblLevelTypePopupService
                .open(TblLevelTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
