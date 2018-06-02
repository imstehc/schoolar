import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblPhone } from './tbl-phone.model';
import { TblPhoneService } from './tbl-phone.service';

@Component({
    selector: 'jhi-tbl-phone-detail',
    templateUrl: './tbl-phone-detail.component.html'
})
export class TblPhoneDetailComponent implements OnInit {

    tblPhone: TblPhone;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblPhoneService: TblPhoneService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblPhones();
    }

    load(id) {
        this.tblPhoneService.find(id).subscribe((tblPhone) => {
            this.tblPhone = tblPhone;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblPhones() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblPhoneListModification',
            (response) => this.load(this.tblPhone.id)
        );
    }
}
