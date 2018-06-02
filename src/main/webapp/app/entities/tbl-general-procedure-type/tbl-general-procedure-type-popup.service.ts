import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TblGeneralProcedureType } from './tbl-general-procedure-type.model';
import { TblGeneralProcedureTypeService } from './tbl-general-procedure-type.service';

@Injectable()
export class TblGeneralProcedureTypePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tblGeneralProcedureTypeService: TblGeneralProcedureTypeService

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
                this.tblGeneralProcedureTypeService.find(id).subscribe((tblGeneralProcedureType) => {
                    tblGeneralProcedureType.dtmLastUpdate = this.datePipe
                        .transform(tblGeneralProcedureType.dtmLastUpdate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tblGeneralProcedureTypeModalRef(component, tblGeneralProcedureType);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tblGeneralProcedureTypeModalRef(component, new TblGeneralProcedureType());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tblGeneralProcedureTypeModalRef(component: Component, tblGeneralProcedureType: TblGeneralProcedureType): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tblGeneralProcedureType = tblGeneralProcedureType;
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
