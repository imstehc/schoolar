import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblAuthentication } from './tbl-authentication.model';
import { TblAuthenticationPopupService } from './tbl-authentication-popup.service';
import { TblAuthenticationService } from './tbl-authentication.service';

@Component({
    selector: 'jhi-tbl-authentication-delete-dialog',
    templateUrl: './tbl-authentication-delete-dialog.component.html'
})
export class TblAuthenticationDeleteDialogComponent {

    tblAuthentication: TblAuthentication;

    constructor(
        private tblAuthenticationService: TblAuthenticationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblAuthenticationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblAuthenticationListModification',
                content: 'Deleted an tblAuthentication'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-authentication-delete-popup',
    template: ''
})
export class TblAuthenticationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblAuthenticationPopupService: TblAuthenticationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblAuthenticationPopupService
                .open(TblAuthenticationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
