import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TblSchoolNetworkSchool } from './tbl-school-network-school.model';
import { TblSchoolNetworkSchoolService } from './tbl-school-network-school.service';

@Injectable()
export class TblSchoolNetworkSchoolPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tblSchoolNetworkSchoolService: TblSchoolNetworkSchoolService

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
                this.tblSchoolNetworkSchoolService.find(id).subscribe((tblSchoolNetworkSchool) => {
                    tblSchoolNetworkSchool.dtmCreated = this.datePipe
                        .transform(tblSchoolNetworkSchool.dtmCreated, 'yyyy-MM-ddTHH:mm:ss');
                    tblSchoolNetworkSchool.dtmLastUpdate = this.datePipe
                        .transform(tblSchoolNetworkSchool.dtmLastUpdate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tblSchoolNetworkSchoolModalRef(component, tblSchoolNetworkSchool);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tblSchoolNetworkSchoolModalRef(component, new TblSchoolNetworkSchool());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tblSchoolNetworkSchoolModalRef(component: Component, tblSchoolNetworkSchool: TblSchoolNetworkSchool): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tblSchoolNetworkSchool = tblSchoolNetworkSchool;
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
