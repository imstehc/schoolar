import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblClass } from './tbl-class.model';
import { TblClassPopupService } from './tbl-class-popup.service';
import { TblClassService } from './tbl-class.service';

@Component({
    selector: 'jhi-tbl-class-delete-dialog',
    templateUrl: './tbl-class-delete-dialog.component.html'
})
export class TblClassDeleteDialogComponent {

    tblClass: TblClass;

    constructor(
        private tblClassService: TblClassService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblClassService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblClassListModification',
                content: 'Deleted an tblClass'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-class-delete-popup',
    template: ''
})
export class TblClassDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblClassPopupService: TblClassPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblClassPopupService
                .open(TblClassDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
