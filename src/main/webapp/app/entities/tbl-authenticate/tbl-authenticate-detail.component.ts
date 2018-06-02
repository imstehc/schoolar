import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblAuthenticate } from './tbl-authenticate.model';
import { TblAuthenticateService } from './tbl-authenticate.service';

@Component({
    selector: 'jhi-tbl-authenticate-detail',
    templateUrl: './tbl-authenticate-detail.component.html'
})
export class TblAuthenticateDetailComponent implements OnInit {

    tblAuthenticate: TblAuthenticate;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblAuthenticateService: TblAuthenticateService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblAuthenticates();
    }

    load(id) {
        this.tblAuthenticateService.find(id).subscribe((tblAuthenticate) => {
            this.tblAuthenticate = tblAuthenticate;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblAuthenticates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblAuthenticateListModification',
            (response) => this.load(this.tblAuthenticate.id)
        );
    }
}
