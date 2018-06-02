import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TblSchoolUserRole } from './tbl-school-user-role.model';
import { TblSchoolUserRoleService } from './tbl-school-user-role.service';

@Injectable()
export class TblSchoolUserRolePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tblSchoolUserRoleService: TblSchoolUserRoleService

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
                this.tblSchoolUserRoleService.find(id).subscribe((tblSchoolUserRole) => {
                    tblSchoolUserRole.dtmCreated = this.datePipe
                        .transform(tblSchoolUserRole.dtmCreated, 'yyyy-MM-ddTHH:mm:ss');
                    tblSchoolUserRole.dtmLastUpdate = this.datePipe
                        .transform(tblSchoolUserRole.dtmLastUpdate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tblSchoolUserRoleModalRef(component, tblSchoolUserRole);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tblSchoolUserRoleModalRef(component, new TblSchoolUserRole());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tblSchoolUserRoleModalRef(component: Component, tblSchoolUserRole: TblSchoolUserRole): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tblSchoolUserRole = tblSchoolUserRole;
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
