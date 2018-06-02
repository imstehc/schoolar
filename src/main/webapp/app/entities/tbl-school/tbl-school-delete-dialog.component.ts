import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblSchool } from './tbl-school.model';
import { TblSchoolPopupService } from './tbl-school-popup.service';
import { TblSchoolService } from './tbl-school.service';

@Component({
    selector: 'jhi-tbl-school-delete-dialog',
    templateUrl: './tbl-school-delete-dialog.component.html',
    styleUrls: ['scss/tbl-school-dialog.scss']
})
export class TblSchoolDeleteDialogComponent {

    tblSchool: TblSchool;

    constructor(
        private tblSchoolService: TblSchoolService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblSchoolService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblSchoolListModification',
                content: 'Deleted an tblSchool'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-school-delete-popup',
    template: ''
})
export class TblSchoolDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblSchoolPopupService: TblSchoolPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblSchoolPopupService
                .open(TblSchoolDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
