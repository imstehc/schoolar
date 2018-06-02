import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TblClassStudent } from './tbl-class-student.model';
import { TblClassStudentService } from './tbl-class-student.service';

@Injectable()
export class TblClassStudentPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tblClassStudentService: TblClassStudentService

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
                this.tblClassStudentService.find(id).subscribe((tblClassStudent) => {
                    tblClassStudent.dtmLastUpdate = this.datePipe
                        .transform(tblClassStudent.dtmLastUpdate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tblClassStudentModalRef(component, tblClassStudent);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tblClassStudentModalRef(component, new TblClassStudent());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tblClassStudentModalRef(component: Component, tblClassStudent: TblClassStudent): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tblClassStudent = tblClassStudent;
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
