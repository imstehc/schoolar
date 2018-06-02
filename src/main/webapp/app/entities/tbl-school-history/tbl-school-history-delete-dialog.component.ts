import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblSchoolHistory } from './tbl-school-history.model';
import { TblSchoolHistoryPopupService } from './tbl-school-history-popup.service';
import { TblSchoolHistoryService } from './tbl-school-history.service';

@Component({
    selector: 'jhi-tbl-school-history-delete-dialog',
    templateUrl: './tbl-school-history-delete-dialog.component.html'
})
export class TblSchoolHistoryDeleteDialogComponent {

    tblSchoolHistory: TblSchoolHistory;

    constructor(
        private tblSchoolHistoryService: TblSchoolHistoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblSchoolHistoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblSchoolHistoryListModification',
                content: 'Deleted an tblSchoolHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-school-history-delete-popup',
    template: ''
})
export class TblSchoolHistoryDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblSchoolHistoryPopupService: TblSchoolHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblSchoolHistoryPopupService
                .open(TblSchoolHistoryDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
