import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblGuardianHistory } from './tbl-guardian-history.model';
import { TblGuardianHistoryPopupService } from './tbl-guardian-history-popup.service';
import { TblGuardianHistoryService } from './tbl-guardian-history.service';

@Component({
    selector: 'jhi-tbl-guardian-history-delete-dialog',
    templateUrl: './tbl-guardian-history-delete-dialog.component.html'
})
export class TblGuardianHistoryDeleteDialogComponent {

    tblGuardianHistory: TblGuardianHistory;

    constructor(
        private tblGuardianHistoryService: TblGuardianHistoryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblGuardianHistoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblGuardianHistoryListModification',
                content: 'Deleted an tblGuardianHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-guardian-history-delete-popup',
    template: ''
})
export class TblGuardianHistoryDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblGuardianHistoryPopupService: TblGuardianHistoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblGuardianHistoryPopupService
                .open(TblGuardianHistoryDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
