import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TblAuthenticate } from './tbl-authenticate.model';
import { TblAuthenticateService } from './tbl-authenticate.service';

@Injectable()
export class TblAuthenticatePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tblAuthenticateService: TblAuthenticateService

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
                this.tblAuthenticateService.find(id).subscribe((tblAuthenticate) => {
                    tblAuthenticate.dtmTimeStamp = this.datePipe
                        .transform(tblAuthenticate.dtmTimeStamp, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tblAuthenticateModalRef(component, tblAuthenticate);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tblAuthenticateModalRef(component, new TblAuthenticate());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tblAuthenticateModalRef(component: Component, tblAuthenticate: TblAuthenticate): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tblAuthenticate = tblAuthenticate;
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
