import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblAuthentication } from './tbl-authentication.model';
import { TblAuthenticationService } from './tbl-authentication.service';

@Component({
    selector: 'jhi-tbl-authentication-detail',
    templateUrl: './tbl-authentication-detail.component.html'
})
export class TblAuthenticationDetailComponent implements OnInit {

    tblAuthentication: TblAuthentication;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblAuthenticationService: TblAuthenticationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblAuthentications();
    }

    load(id) {
        this.tblAuthenticationService.find(id).subscribe((tblAuthentication) => {
            this.tblAuthentication = tblAuthentication;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblAuthentications() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblAuthenticationListModification',
            (response) => this.load(this.tblAuthentication.id)
        );
    }
}
