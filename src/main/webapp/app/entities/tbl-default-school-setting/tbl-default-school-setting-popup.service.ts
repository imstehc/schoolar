import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TblDefaultSchoolSetting } from './tbl-default-school-setting.model';
import { TblDefaultSchoolSettingService } from './tbl-default-school-setting.service';

@Injectable()
export class TblDefaultSchoolSettingPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tblDefaultSchoolSettingService: TblDefaultSchoolSettingService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.tblDefaultSchoolSettingService.find(id).subscribe((tblDefaultSchoolSetting) => {
                    tblDefaultSchoolSetting.dtmLastUpdate = this.datePipe
                        .transform(tblDefaultSchoolSetting.dtmLastUpdate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tblDefaultSchoolSettingModalRef(component, tblDefaultSchoolSetting);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tblDefaultSchoolSettingModalRef(component, new TblDefaultSchoolSetting());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tblDefaultSchoolSettingModalRef(component: Component, tblDefaultSchoolSetting: TblDefaultSchoolSetting): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tblDefaultSchoolSetting = tblDefaultSchoolSetting;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
