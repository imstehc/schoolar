import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblSchoolSetting } from './tbl-school-setting.model';
import { TblSchoolSettingPopupService } from './tbl-school-setting-popup.service';
import { TblSchoolSettingService } from './tbl-school-setting.service';

@Component({
    selector: 'jhi-tbl-school-setting-delete-dialog',
    templateUrl: './tbl-school-setting-delete-dialog.component.html'
})
export class TblSchoolSettingDeleteDialogComponent {

    tblSchoolSetting: TblSchoolSetting;

    constructor(
        private tblSchoolSettingService: TblSchoolSettingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblSchoolSettingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblSchoolSettingListModification',
                content: 'Deleted an tblSchoolSetting'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-school-setting-delete-popup',
    template: ''
})
export class TblSchoolSettingDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblSchoolSettingPopupService: TblSchoolSettingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblSchoolSettingPopupService
                .open(TblSchoolSettingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
