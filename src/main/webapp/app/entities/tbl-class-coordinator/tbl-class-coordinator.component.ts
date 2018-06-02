import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblClassCoordinator } from './tbl-class-coordinator.model';
import { TblClassCoordinatorService } from './tbl-class-coordinator.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-class-coordinator',
    templateUrl: './tbl-class-coordinator.component.html'
})
export class TblClassCoordinatorComponent implements OnInit {
tblClassCoordinators: TblClassCoordinator[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblClassCoordinatorService: TblClassCoordinatorService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblClassCoordinatorService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblClassCoordinators = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblClassCoordinators();
    }

    trackId(index: number, item: TblClassCoordinator) {
        return item.id;
    }
    registerChangeInTblClassCoordinators() {
        this.eventSubscriber = this.eventManager.subscribe('tblClassCoordinatorListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
