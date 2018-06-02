import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblSchoolNetwork } from './tbl-school-network.model';
import { TblSchoolNetworkService } from './tbl-school-network.service';

@Component({
    selector: 'jhi-tbl-school-network-detail',
    templateUrl: './tbl-school-network-detail.component.html'
})
export class TblSchoolNetworkDetailComponent implements OnInit {

    tblSchoolNetwork: TblSchoolNetwork;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblSchoolNetworkService: TblSchoolNetworkService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblSchoolNetworks();
    }

    load(id) {
        this.tblSchoolNetworkService.find(id).subscribe((tblSchoolNetwork) => {
            this.tblSchoolNetwork = tblSchoolNetwork;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblSchoolNetworks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblSchoolNetworkListModification',
            (response) => this.load(this.tblSchoolNetwork.id)
        );
    }
}
