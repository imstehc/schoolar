import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblLevelType } from './tbl-level-type.model';
import { TblLevelTypeService } from './tbl-level-type.service';

@Component({
    selector: 'jhi-tbl-level-type-detail',
    templateUrl: './tbl-level-type-detail.component.html'
})
export class TblLevelTypeDetailComponent implements OnInit {

    tblLevelType: TblLevelType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblLevelTypeService: TblLevelTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblLevelTypes();
    }

    load(id) {
        this.tblLevelTypeService.find(id).subscribe((tblLevelType) => {
            this.tblLevelType = tblLevelType;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblLevelTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblLevelTypeListModification',
            (response) => this.load(this.tblLevelType.id)
        );
    }
}
