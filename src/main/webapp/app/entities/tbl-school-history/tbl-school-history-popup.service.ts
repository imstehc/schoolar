import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TblSchoolHistory } from './tbl-school-history.model';
import { TblSchoolHistoryService } from './tbl-school-history.service';

@Injectable()
export class TblSchoolHistoryPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tblSchoolHistoryService: TblSchoolHistoryService

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
                this.tblSchoolHistoryService.find(id).subscribe((tblSchoolHistory) => {
                    tblSchoolHistory.dtmChanged = this.datePipe
                        .transform(tblSchoolHistory.dtmChanged, 'yyyy-MM-ddTHH:mm:ss');
                    tblSchoolHistory.dtmLastUpdate = this.datePipe
                        .transform(tblSchoolHistory.dtmLastUpdate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tblSchoolHistoryModalRef(component, tblSchoolHistory);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tblSchoolHistoryModalRef(component, new TblSchoolHistory());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tblSchoolHistoryModalRef(component: Component, tblSchoolHistory: TblSchoolHistory): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tblSchoolHistory = tblSchoolHistory;
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
