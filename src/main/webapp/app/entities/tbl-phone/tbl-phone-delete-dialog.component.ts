import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblPhone } from './tbl-phone.model';
import { TblPhonePopupService } from './tbl-phone-popup.service';
import { TblPhoneService } from './tbl-phone.service';

@Component({
    selector: 'jhi-tbl-phone-delete-dialog',
    templateUrl: './tbl-phone-delete-dialog.component.html'
})
export class TblPhoneDeleteDialogComponent {

    tblPhone: TblPhone;

    constructor(
        private tblPhoneService: TblPhoneService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblPhoneService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblPhoneListModification',
                content: 'Deleted an tblPhone'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-phone-delete-popup',
    template: ''
})
export class TblPhoneDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblPhonePopupService: TblPhonePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblPhonePopupService
                .open(TblPhoneDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
