import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblSchoolUser } from './tbl-school-user.model';
import { TblSchoolUserService } from './tbl-school-user.service';

@Component({
    selector: 'jhi-tbl-school-user-detail',
    templateUrl: './tbl-school-user-detail.component.html'
})
export class TblSchoolUserDetailComponent implements OnInit, OnDestroy {

    tblSchoolUser: TblSchoolUser;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblSchoolUserService: TblSchoolUserService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblSchoolUsers();
    }

    load(id) {
        this.tblSchoolUserService.find(id).subscribe((tblSchoolUser) => {
            this.tblSchoolUser = tblSchoolUser;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTblSchoolUsers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblSchoolUserListModification',
            (response) => this.load(this.tblSchoolUser.id)
        );
    }
}
