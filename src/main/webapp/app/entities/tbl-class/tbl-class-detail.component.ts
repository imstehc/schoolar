import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblClass } from './tbl-class.model';
import { TblClassService } from './tbl-class.service';

@Component({
    selector: 'jhi-tbl-class-detail',
    templateUrl: './tbl-class-detail.component.html'
})
export class TblClassDetailComponent implements OnInit {

    tblClass: TblClass;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblClassService: TblClassService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblClasses();
    }

    load(id) {
        this.tblClassService.find(id).subscribe((tblClass) => {
            this.tblClass = tblClass;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblClasses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblClassListModification',
            (response) => this.load(this.tblClass.id)
        );
    }
}
