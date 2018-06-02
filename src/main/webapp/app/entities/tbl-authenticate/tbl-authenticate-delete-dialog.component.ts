import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblAuthenticate } from './tbl-authenticate.model';
import { TblAuthenticatePopupService } from './tbl-authenticate-popup.service';
import { TblAuthenticateService } from './tbl-authenticate.service';

@Component({
    selector: 'jhi-tbl-authenticate-delete-dialog',
    templateUrl: './tbl-authenticate-delete-dialog.component.html'
})
export class TblAuthenticateDeleteDialogComponent {

    tblAuthenticate: TblAuthenticate;

    constructor(
        private tblAuthenticateService: TblAuthenticateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblAuthenticateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblAuthenticateListModification',
                content: 'Deleted an tblAuthenticate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-authenticate-delete-popup',
    template: ''
})
export class TblAuthenticateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblAuthenticatePopupService: TblAuthenticatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblAuthenticatePopupService
                .open(TblAuthenticateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
