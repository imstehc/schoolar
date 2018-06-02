import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TblSchool } from './tbl-school.model';
import { TblSchoolService } from './tbl-school.service';

@Injectable()
export class TblSchoolPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tblSchoolService: TblSchoolService

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
                this.tblSchoolService.find(id).subscribe((tblSchool) => {
                    tblSchool.dtmCreated = this.datePipe
                        .transform(tblSchool.dtmCreated, 'yyyy-MM-ddTHH:mm:ss');
                    tblSchool.dtmLastUpdate = this.datePipe
                        .transform(tblSchool.dtmLastUpdate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tblSchoolModalRef(component, tblSchool);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tblSchoolModalRef(component, new TblSchool());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tblSchoolModalRef(component: Component, tblSchool: TblSchool): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tblSchool = tblSchool;
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
