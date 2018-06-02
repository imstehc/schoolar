import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblAudienceClient } from './tbl-audience-client.model';
import { TblAudienceClientPopupService } from './tbl-audience-client-popup.service';
import { TblAudienceClientService } from './tbl-audience-client.service';

@Component({
    selector: 'jhi-tbl-audience-client-delete-dialog',
    templateUrl: './tbl-audience-client-delete-dialog.component.html'
})
export class TblAudienceClientDeleteDialogComponent {

    tblAudienceClient: TblAudienceClient;

    constructor(
        private tblAudienceClientService: TblAudienceClientService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblAudienceClientService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblAudienceClientListModification',
                content: 'Deleted an tblAudienceClient'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-audience-client-delete-popup',
    template: ''
})
export class TblAudienceClientDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblAudienceClientPopupService: TblAudienceClientPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblAudienceClientPopupService
                .open(TblAudienceClientDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
