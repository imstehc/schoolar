import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblSchoolSubject } from './tbl-school-subject.model';
import { TblSchoolSubjectPopupService } from './tbl-school-subject-popup.service';
import { TblSchoolSubjectService } from './tbl-school-subject.service';

@Component({
    selector: 'jhi-tbl-school-subject-delete-dialog',
    templateUrl: './tbl-school-subject-delete-dialog.component.html'
})
export class TblSchoolSubjectDeleteDialogComponent {

    tblSchoolSubject: TblSchoolSubject;

    constructor(
        private tblSchoolSubjectService: TblSchoolSubjectService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblSchoolSubjectService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblSchoolSubjectListModification',
                content: 'Deleted an tblSchoolSubject'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-school-subject-delete-popup',
    template: ''
})
export class TblSchoolSubjectDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblSchoolSubjectPopupService: TblSchoolSubjectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblSchoolSubjectPopupService
                .open(TblSchoolSubjectDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
