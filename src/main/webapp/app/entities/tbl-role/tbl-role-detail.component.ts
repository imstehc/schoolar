import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblRole } from './tbl-role.model';
import { TblRoleService } from './tbl-role.service';

@Component({
    selector: 'jhi-tbl-role-detail',
    templateUrl: './tbl-role-detail.component.html'
})
export class TblRoleDetailComponent implements OnInit {

    tblRole: TblRole;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblRoleService: TblRoleService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblRoles();
    }

    load(id) {
        this.tblRoleService.find(id).subscribe((tblRole) => {
            this.tblRole = tblRole;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblRoles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblRoleListModification',
            (response) => this.load(this.tblRole.id)
        );
    }
}
