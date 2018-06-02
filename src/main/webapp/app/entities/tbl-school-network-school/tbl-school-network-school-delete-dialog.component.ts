import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblSchoolNetworkSchool } from './tbl-school-network-school.model';
import { TblSchoolNetworkSchoolPopupService } from './tbl-school-network-school-popup.service';
import { TblSchoolNetworkSchoolService } from './tbl-school-network-school.service';

@Component({
    selector: 'jhi-tbl-school-network-school-delete-dialog',
    templateUrl: './tbl-school-network-school-delete-dialog.component.html'
})
export class TblSchoolNetworkSchoolDeleteDialogComponent {

    tblSchoolNetworkSchool: TblSchoolNetworkSchool;

    constructor(
        private tblSchoolNetworkSchoolService: TblSchoolNetworkSchoolService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblSchoolNetworkSchoolService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblSchoolNetworkSchoolListModification',
                content: 'Deleted an tblSchoolNetworkSchool'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-school-network-school-delete-popup',
    template: ''
})
export class TblSchoolNetworkSchoolDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblSchoolNetworkSchoolPopupService: TblSchoolNetworkSchoolPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblSchoolNetworkSchoolPopupService
                .open(TblSchoolNetworkSchoolDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
