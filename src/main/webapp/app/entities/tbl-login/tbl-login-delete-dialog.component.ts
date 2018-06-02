import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblLogin } from './tbl-login.model';
import { TblLoginPopupService } from './tbl-login-popup.service';
import { TblLoginService } from './tbl-login.service';

@Component({
    selector: 'jhi-tbl-login-delete-dialog',
    templateUrl: './tbl-login-delete-dialog.component.html'
})
export class TblLoginDeleteDialogComponent {

    tblLogin: TblLogin;

    constructor(
        private tblLoginService: TblLoginService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblLoginService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblLoginListModification',
                content: 'Deleted an tblLogin'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-login-delete-popup',
    template: ''
})
export class TblLoginDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblLoginPopupService: TblLoginPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblLoginPopupService
                .open(TblLoginDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
