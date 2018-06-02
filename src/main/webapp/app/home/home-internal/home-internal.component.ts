import { Component, OnInit } from '@angular/core';
import {Principal} from '../../shared/auth/principal.service';

@Component({
  selector: 'jhi-home-internal',
  templateUrl: './home-internal.component.html',
  styleUrls: ['home-internal.scss']
})
export class HomeInternalComponent implements OnInit {
    account: Account;
    isNavbarCollapsed: boolean;
    isHome: any;
    constructor(
        private principal: Principal
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }
}
