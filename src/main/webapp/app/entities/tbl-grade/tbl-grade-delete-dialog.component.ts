import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblGrade } from './tbl-grade.model';
import { TblGradePopupService } from './tbl-grade-popup.service';
import { TblGradeService } from './tbl-grade.service';

@Component({
    selector: 'jhi-tbl-grade-delete-dialog',
    templateUrl: './tbl-grade-delete-dialog.component.html'
})
export class TblGradeDeleteDialogComponent {

    tblGrade: TblGrade;

    constructor(
        private tblGradeService: TblGradeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblGradeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblGradeListModification',
                content: 'Deleted an tblGrade'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-grade-delete-popup',
    template: ''
})
export class TblGradeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblGradePopupService: TblGradePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblGradePopupService
                .open(TblGradeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
