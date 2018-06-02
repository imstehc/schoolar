import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblAddress } from './tbl-address.model';
import { TblAddressPopupService } from './tbl-address-popup.service';
import { TblAddressService } from './tbl-address.service';

@Component({
    selector: 'jhi-tbl-address-delete-dialog',
    templateUrl: './tbl-address-delete-dialog.component.html'
})
export class TblAddressDeleteDialogComponent {

    tblAddress: TblAddress;

    constructor(
        private tblAddressService: TblAddressService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblAddressService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblAddressListModification',
                content: 'Deleted an tblAddress'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-address-delete-popup',
    template: ''
})
export class TblAddressDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblAddressPopupService: TblAddressPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblAddressPopupService
                .open(TblAddressDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
