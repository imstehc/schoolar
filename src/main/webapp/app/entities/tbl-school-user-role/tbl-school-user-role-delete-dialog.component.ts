import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblSchoolUserRole } from './tbl-school-user-role.model';
import { TblSchoolUserRolePopupService } from './tbl-school-user-role-popup.service';
import { TblSchoolUserRoleService } from './tbl-school-user-role.service';

@Component({
    selector: 'jhi-tbl-school-user-role-delete-dialog',
    templateUrl: './tbl-school-user-role-delete-dialog.component.html'
})
export class TblSchoolUserRoleDeleteDialogComponent {

    tblSchoolUserRole: TblSchoolUserRole;

    constructor(
        private tblSchoolUserRoleService: TblSchoolUserRoleService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblSchoolUserRoleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblSchoolUserRoleListModification',
                content: 'Deleted an tblSchoolUserRole'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-school-user-role-delete-popup',
    template: ''
})
export class TblSchoolUserRoleDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblSchoolUserRolePopupService: TblSchoolUserRolePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblSchoolUserRolePopupService
                .open(TblSchoolUserRoleDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
