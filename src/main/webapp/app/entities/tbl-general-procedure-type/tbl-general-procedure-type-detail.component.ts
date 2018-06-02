import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblGeneralProcedureType } from './tbl-general-procedure-type.model';
import { TblGeneralProcedureTypeService } from './tbl-general-procedure-type.service';

@Component({
    selector: 'jhi-tbl-general-procedure-type-detail',
    templateUrl: './tbl-general-procedure-type-detail.component.html'
})
export class TblGeneralProcedureTypeDetailComponent implements OnInit {

    tblGeneralProcedureType: TblGeneralProcedureType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblGeneralProcedureTypeService: TblGeneralProcedureTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblGeneralProcedureTypes();
    }

    load(id) {
        this.tblGeneralProcedureTypeService.find(id).subscribe((tblGeneralProcedureType) => {
            this.tblGeneralProcedureType = tblGeneralProcedureType;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblGeneralProcedureTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblGeneralProcedureTypeListModification',
            (response) => this.load(this.tblGeneralProcedureType.id)
        );
    }
}
