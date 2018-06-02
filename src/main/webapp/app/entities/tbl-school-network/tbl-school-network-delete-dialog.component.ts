import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblSchoolNetwork } from './tbl-school-network.model';
import { TblSchoolNetworkPopupService } from './tbl-school-network-popup.service';
import { TblSchoolNetworkService } from './tbl-school-network.service';

@Component({
    selector: 'jhi-tbl-school-network-delete-dialog',
    templateUrl: './tbl-school-network-delete-dialog.component.html'
})
export class TblSchoolNetworkDeleteDialogComponent {

    tblSchoolNetwork: TblSchoolNetwork;

    constructor(
        private tblSchoolNetworkService: TblSchoolNetworkService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblSchoolNetworkService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblSchoolNetworkListModification',
                content: 'Deleted an tblSchoolNetwork'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-school-network-delete-popup',
    template: ''
})
export class TblSchoolNetworkDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblSchoolNetworkPopupService: TblSchoolNetworkPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblSchoolNetworkPopupService
                .open(TblSchoolNetworkDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
