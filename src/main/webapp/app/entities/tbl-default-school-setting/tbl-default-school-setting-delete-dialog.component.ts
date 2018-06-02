import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblDefaultSchoolSetting } from './tbl-default-school-setting.model';
import { TblDefaultSchoolSettingPopupService } from './tbl-default-school-setting-popup.service';
import { TblDefaultSchoolSettingService } from './tbl-default-school-setting.service';

@Component({
    selector: 'jhi-tbl-default-school-setting-delete-dialog',
    templateUrl: './tbl-default-school-setting-delete-dialog.component.html'
})
export class TblDefaultSchoolSettingDeleteDialogComponent {

    tblDefaultSchoolSetting: TblDefaultSchoolSetting;

    constructor(
        private tblDefaultSchoolSettingService: TblDefaultSchoolSettingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblDefaultSchoolSettingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblDefaultSchoolSettingListModification',
                content: 'Deleted an tblDefaultSchoolSetting'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-default-school-setting-delete-popup',
    template: ''
})
export class TblDefaultSchoolSettingDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblDefaultSchoolSettingPopupService: TblDefaultSchoolSettingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblDefaultSchoolSettingPopupService
                .open(TblDefaultSchoolSettingDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
