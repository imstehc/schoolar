import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblNfc } from './tbl-nfc.model';
import { TblNfcService } from './tbl-nfc.service';

@Component({
    selector: 'jhi-tbl-nfc-detail',
    templateUrl: './tbl-nfc-detail.component.html'
})
export class TblNfcDetailComponent implements OnInit {

    tblNfc: TblNfc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblNfcService: TblNfcService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblNfcs();
    }

    load(id) {
        this.tblNfcService.find(id).subscribe((tblNfc) => {
            this.tblNfc = tblNfc;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblNfcs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblNfcListModification',
            (response) => this.load(this.tblNfc.id)
        );
    }
}
