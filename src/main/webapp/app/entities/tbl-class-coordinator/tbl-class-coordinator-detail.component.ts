import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblClassCoordinator } from './tbl-class-coordinator.model';
import { TblClassCoordinatorService } from './tbl-class-coordinator.service';

@Component({
    selector: 'jhi-tbl-class-coordinator-detail',
    templateUrl: './tbl-class-coordinator-detail.component.html'
})
export class TblClassCoordinatorDetailComponent implements OnInit {

    tblClassCoordinator: TblClassCoordinator;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblClassCoordinatorService: TblClassCoordinatorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblClassCoordinators();
    }

    load(id) {
        this.tblClassCoordinatorService.find(id).subscribe((tblClassCoordinator) => {
            this.tblClassCoordinator = tblClassCoordinator;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblClassCoordinators() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblClassCoordinatorListModification',
            (response) => this.load(this.tblClassCoordinator.id)
        );
    }
}
