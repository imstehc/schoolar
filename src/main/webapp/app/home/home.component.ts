import {Component, ElementRef, OnInit} from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, Principal } from '../shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    isHome: any;
    constructor(
        private principal: Principal,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
         this.principal.identity().then((account) => {
            this.account = account;
        });
         this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
         this.eventManager.subscribe('authenticationSuccess', (message) => {
             this.principal.identity().then((account) => {
                 this.account = account;
             });
         });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
}