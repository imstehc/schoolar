import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TblSchoolUser } from './tbl-school-user.model';
import { TblSchoolUserService } from './tbl-school-user.service';

@Injectable()
export class TblSchoolUserPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tblSchoolUserService: TblSchoolUserService

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
                this.tblSchoolUserService.find(id).subscribe((tblSchoolUser) => {
                    tblSchoolUser.dtmCreated = this.datePipe
                        .transform(tblSchoolUser.dtmCreated, 'yyyy-MM-ddTHH:mm:ss');
                    tblSchoolUser.dtmLastUpdate = this.datePipe
                        .transform(tblSchoolUser.dtmLastUpdate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tblSchoolUserModalRef(component, tblSchoolUser);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tblSchoolUserModalRef(component, new TblSchoolUser());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tblSchoolUserModalRef(component: Component, tblSchoolUser: TblSchoolUser): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tblSchoolUser = tblSchoolUser;
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
