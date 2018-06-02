import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblUserDTO } from './tbl-user.model';
import { TblUserService } from './tbl-user.service';

@Component({
    selector: 'jhi-tbl-user-detail',
    templateUrl: './tbl-user-detail.component.html'
})
export class TblUserDetailComponent implements OnInit, OnDestroy {

    tblUser: TblUserDTO;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblUserService: TblUserService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblUsers();
    }

    load(id) {
        this.tblUserService.find(id).subscribe((tblUser) => {
            this.tblUser = tblUser;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTblUsers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblUserListModification',
            (response) => this.load(this.tblUser.id)
        );
    }
}
