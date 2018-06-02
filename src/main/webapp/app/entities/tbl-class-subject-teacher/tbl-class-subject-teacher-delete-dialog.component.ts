import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblClassSubjectTeacher } from './tbl-class-subject-teacher.model';
import { TblClassSubjectTeacherPopupService } from './tbl-class-subject-teacher-popup.service';
import { TblClassSubjectTeacherService } from './tbl-class-subject-teacher.service';

@Component({
    selector: 'jhi-tbl-class-subject-teacher-delete-dialog',
    templateUrl: './tbl-class-subject-teacher-delete-dialog.component.html'
})
export class TblClassSubjectTeacherDeleteDialogComponent {

    tblClassSubjectTeacher: TblClassSubjectTeacher;

    constructor(
        private tblClassSubjectTeacherService: TblClassSubjectTeacherService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblClassSubjectTeacherService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblClassSubjectTeacherListModification',
                content: 'Deleted an tblClassSubjectTeacher'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-class-subject-teacher-delete-popup',
    template: ''
})
export class TblClassSubjectTeacherDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblClassSubjectTeacherPopupService: TblClassSubjectTeacherPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblClassSubjectTeacherPopupService
                .open(TblClassSubjectTeacherDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
