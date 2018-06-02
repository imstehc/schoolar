import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblUserDTO } from './tbl-user.model';
import { TblUserPopupService } from './tbl-user-popup.service';
import { TblUserService } from './tbl-user.service';

@Component({
    selector: 'jhi-tbl-user-delete-dialog',
    templateUrl: './tbl-user-delete-dialog.component.html',
    styleUrls: [
        'scss/tbl-user-dialog.scss'
    ]
})
export class TblUserDeleteDialogComponent {

    tblUser: TblUserDTO;

    constructor(
        private tblUserService: TblUserService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblUserService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblUserListModification',
                content: 'Deleted an tblUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-user-delete-popup',
    template: ''
})
export class TblUserDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblUserPopupService: TblUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblUserPopupService
                .open(TblUserDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
