import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TblAudienceClient } from './tbl-audience-client.model';
import { TblAudienceClientService } from './tbl-audience-client.service';

@Injectable()
export class TblAudienceClientPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private tblAudienceClientService: TblAudienceClientService

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
                this.tblAudienceClientService.find(id).subscribe((tblAudienceClient) => {
                    this.ngbModalRef = this.tblAudienceClientModalRef(component, tblAudienceClient);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tblAudienceClientModalRef(component, new TblAudienceClient());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tblAudienceClientModalRef(component: Component, tblAudienceClient: TblAudienceClient): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tblAudienceClient = tblAudienceClient;
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
