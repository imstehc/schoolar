import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TblLogin } from './tbl-login.model';
import { TblLoginService } from './tbl-login.service';

@Component({
    selector: 'jhi-tbl-login-detail',
    templateUrl: './tbl-login-detail.component.html'
})
export class TblLoginDetailComponent implements OnInit {

    tblLogin: TblLogin;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tblLoginService: TblLoginService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTblLogins();
    }

    load(id) {
        this.tblLoginService.find(id).subscribe((tblLogin) => {
            this.tblLogin = tblLogin;
        });
    }
    previousState() {
        window.history.back();
    }

    registerChangeInTblLogins() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tblLoginListModification',
            (response) => this.load(this.tblLogin.id)
        );
    }
}
