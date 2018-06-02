import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TblSchoolSubject } from './tbl-school-subject.model';
import { TblSchoolSubjectService } from './tbl-school-subject.service';

@Injectable()
export class TblSchoolSubjectPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tblSchoolSubjectService: TblSchoolSubjectService

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
                this.tblSchoolSubjectService.find(id).subscribe((tblSchoolSubject) => {
                    tblSchoolSubject.dtmCreated = this.datePipe
                        .transform(tblSchoolSubject.dtmCreated, 'yyyy-MM-ddTHH:mm:ss');
                    tblSchoolSubject.dtmLastUpdade = this.datePipe
                        .transform(tblSchoolSubject.dtmLastUpdade, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tblSchoolSubjectModalRef(component, tblSchoolSubject);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tblSchoolSubjectModalRef(component, new TblSchoolSubject());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tblSchoolSubjectModalRef(component: Component, tblSchoolSubject: TblSchoolSubject): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tblSchoolSubject = tblSchoolSubject;
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
