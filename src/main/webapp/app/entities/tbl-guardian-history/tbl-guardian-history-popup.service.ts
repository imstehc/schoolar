import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TblGuardianHistory } from './tbl-guardian-history.model';
import { TblGuardianHistoryService } from './tbl-guardian-history.service';

@Injectable()
export class TblGuardianHistoryPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tblGuardianHistoryService: TblGuardianHistoryService

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
                this.tblGuardianHistoryService.find(id).subscribe((tblGuardianHistory) => {
                    tblGuardianHistory.dtmChanged = this.datePipe
                        .transform(tblGuardianHistory.dtmChanged, 'yyyy-MM-ddTHH:mm:ss');
                    tblGuardianHistory.dtmLastUpdate = this.datePipe
                        .transform(tblGuardianHistory.dtmLastUpdate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tblGuardianHistoryModalRef(component, tblGuardianHistory);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tblGuardianHistoryModalRef(component, new TblGuardianHistory());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tblGuardianHistoryModalRef(component: Component, tblGuardianHistory: TblGuardianHistory): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tblGuardianHistory = tblGuardianHistory;
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
