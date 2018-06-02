import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TblSchoolNetwork } from './tbl-school-network.model';
import { TblSchoolNetworkService } from './tbl-school-network.service';

@Injectable()
export class TblSchoolNetworkPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tblSchoolNetworkService: TblSchoolNetworkService

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
                this.tblSchoolNetworkService.find(id).subscribe((tblSchoolNetwork) => {
                    tblSchoolNetwork.dtmCreated = this.datePipe
                        .transform(tblSchoolNetwork.dtmCreated, 'yyyy-MM-ddTHH:mm:ss');
                    tblSchoolNetwork.dtmLastUpdate = this.datePipe
                        .transform(tblSchoolNetwork.dtmLastUpdate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tblSchoolNetworkModalRef(component, tblSchoolNetwork);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tblSchoolNetworkModalRef(component, new TblSchoolNetwork());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tblSchoolNetworkModalRef(component: Component, tblSchoolNetwork: TblSchoolNetwork): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tblSchoolNetwork = tblSchoolNetwork;
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
