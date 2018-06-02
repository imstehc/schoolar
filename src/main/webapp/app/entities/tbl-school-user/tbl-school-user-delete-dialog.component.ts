import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblSchoolUser } from './tbl-school-user.model';
import { TblSchoolUserPopupService } from './tbl-school-user-popup.service';
import { TblSchoolUserService } from './tbl-school-user.service';

@Component({
    selector: 'jhi-tbl-school-user-delete-dialog',
    templateUrl: './tbl-school-user-delete-dialog.component.html'
})
export class TblSchoolUserDeleteDialogComponent {

    tblSchoolUser: TblSchoolUser;

    constructor(
        private tblSchoolUserService: TblSchoolUserService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblSchoolUserService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblSchoolUserListModification',
                content: 'Deleted an tblSchoolUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-school-user-delete-popup',
    template: ''
})
export class TblSchoolUserDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblSchoolUserPopupService: TblSchoolUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblSchoolUserPopupService
                .open(TblSchoolUserDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
