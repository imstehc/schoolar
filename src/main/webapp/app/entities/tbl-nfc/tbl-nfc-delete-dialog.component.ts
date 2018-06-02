import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblNfc } from './tbl-nfc.model';
import { TblNfcPopupService } from './tbl-nfc-popup.service';
import { TblNfcService } from './tbl-nfc.service';

@Component({
    selector: 'jhi-tbl-nfc-delete-dialog',
    templateUrl: './tbl-nfc-delete-dialog.component.html'
})
export class TblNfcDeleteDialogComponent {

    tblNfc: TblNfc;

    constructor(
        private tblNfcService: TblNfcService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblNfcService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblNfcListModification',
                content: 'Deleted an tblNfc'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-nfc-delete-popup',
    template: ''
})
export class TblNfcDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblNfcPopupService: TblNfcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblNfcPopupService
                .open(TblNfcDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
