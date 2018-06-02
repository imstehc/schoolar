import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblAudienceClient } from './tbl-audience-client.model';
import { TblAudienceClientService } from './tbl-audience-client.service';

@Component({
    selector: 'jhi-tbl-audience-client-detail',
    templateUrl: './tbl-audience-client-detail.component.html'
})
export class TblAudienceClientDetailComponent implements OnInit {

    tblAudienceClient: TblAudienceClient;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblAudienceClientService: TblAudienceClientService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblAudienceClients();
    }

    load(id) {
        this.tblAudienceClientService.find(id).subscribe((tblAudienceClient) => {
            this.tblAudienceClient = tblAudienceClient;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblAudienceClients() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblAudienceClientListModification',
            (response) => this.load(this.tblAudienceClient.id)
        );
    }
}
