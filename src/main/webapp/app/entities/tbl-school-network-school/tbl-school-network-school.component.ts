import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblSchoolNetworkSchool } from './tbl-school-network-school.model';
import { TblSchoolNetworkSchoolService } from './tbl-school-network-school.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-school-network-school',
    templateUrl: './tbl-school-network-school.component.html'
})
export class TblSchoolNetworkSchoolComponent implements OnInit {
tblSchoolNetworkSchools: TblSchoolNetworkSchool[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblSchoolNetworkSchoolService: TblSchoolNetworkSchoolService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblSchoolNetworkSchoolService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblSchoolNetworkSchools = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblSchoolNetworkSchools();
    }

    trackId(index: number, item: TblSchoolNetworkSchool) {
        return item.id;
    }
    registerChangeInTblSchoolNetworkSchools() {
        this.eventSubscriber = this.eventManager.subscribe('tblSchoolNetworkSchoolListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
