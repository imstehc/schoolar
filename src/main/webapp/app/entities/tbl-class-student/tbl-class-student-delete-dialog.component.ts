import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblClassStudent } from './tbl-class-student.model';
import { TblClassStudentPopupService } from './tbl-class-student-popup.service';
import { TblClassStudentService } from './tbl-class-student.service';

@Component({
    selector: 'jhi-tbl-class-student-delete-dialog',
    templateUrl: './tbl-class-student-delete-dialog.component.html'
})
export class TblClassStudentDeleteDialogComponent {

    tblClassStudent: TblClassStudent;

    constructor(
        private tblClassStudentService: TblClassStudentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblClassStudentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblClassStudentListModification',
                content: 'Deleted an tblClassStudent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-class-student-delete-popup',
    template: ''
})
export class TblClassStudentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblClassStudentPopupService: TblClassStudentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblClassStudentPopupService
                .open(TblClassStudentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
