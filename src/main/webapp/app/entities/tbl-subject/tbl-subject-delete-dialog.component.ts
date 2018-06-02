import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TblSubject } from './tbl-subject.model';
import { TblSubjectPopupService } from './tbl-subject-popup.service';
import { TblSubjectService } from './tbl-subject.service';

@Component({
    selector: 'jhi-tbl-subject-delete-dialog',
    templateUrl: './tbl-subject-delete-dialog.component.html'
})
export class TblSubjectDeleteDialogComponent {

    tblSubject: TblSubject;

    constructor(
        private tblSubjectService: TblSubjectService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tblSubjectService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblSubjectListModification',
                content: 'Deleted an tblSubject'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tbl-subject-delete-popup',
    template: ''
})
export class TblSubjectDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblSubjectPopupService: TblSubjectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tblSubjectPopupService
                .open(TblSubjectDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
