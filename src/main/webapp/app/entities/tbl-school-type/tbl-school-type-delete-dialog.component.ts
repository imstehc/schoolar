import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblSchoolType } from './tbl-school-type.model';
import { TblSchoolTypePopupService } from './tbl-school-type-popup.service';
import { TblSchoolTypeService } from './tbl-school-type.service';

@Component({
    selector: 'jhi-tbl-school-type-delete-dialog',
    templateUrl: './tbl-school-type-delete-dialog.component.html'
})
export class TblSchoolTypeDeleteDialogComponent {

    tblSchoolType: TblSchoolType;

    constructor(
        private tblSchoolTypeService: TblSchoolTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblSchoolTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblSchoolTypeListModification',
                content: 'Deleted an tblSchoolType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-school-type-delete-popup',
    template: ''
})
export class TblSchoolTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblSchoolTypePopupService: TblSchoolTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblSchoolTypePopupService
                .open(TblSchoolTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
