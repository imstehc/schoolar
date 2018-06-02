import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TblClassSubjectTeacher } from './tbl-class-subject-teacher.model';
import { TblClassSubjectTeacherService } from './tbl-class-subject-teacher.service';

@Injectable()
export class TblClassSubjectTeacherPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tblClassSubjectTeacherService: TblClassSubjectTeacherService

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
                this.tblClassSubjectTeacherService.find(id).subscribe((tblClassSubjectTeacher) => {
                    tblClassSubjectTeacher.dtmLastUpdate = this.datePipe
                        .transform(tblClassSubjectTeacher.dtmLastUpdate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tblClassSubjectTeacherModalRef(component, tblClassSubjectTeacher);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tblClassSubjectTeacherModalRef(component, new TblClassSubjectTeacher());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tblClassSubjectTeacherModalRef(component: Component, tblClassSubjectTeacher: TblClassSubjectTeacher): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tblClassSubjectTeacher = tblClassSubjectTeacher;
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
