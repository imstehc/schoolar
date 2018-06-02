import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblRole } from './tbl-role.model';
import { TblRolePopupService } from './tbl-role-popup.service';
import { TblRoleService } from './tbl-role.service';

@Component({
    selector: 'jhi-tbl-role-delete-dialog',
    templateUrl: './tbl-role-delete-dialog.component.html'
})
export class TblRoleDeleteDialogComponent {

    tblRole: TblRole;

    constructor(
        private tblRoleService: TblRoleService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblRoleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblRoleListModification',
                content: 'Deleted an tblRole'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-role-delete-popup',
    template: ''
})
export class TblRoleDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblRolePopupService: TblRolePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblRolePopupService
                .open(TblRoleDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
