import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { JhiLanguageHelper, Principal} from '../../shared';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls: [
        'main.scss'
    ]
})
export class JhiMainComponent implements OnInit {

    securityReady: Boolean = false;
    isHome: any;
    constructor(
        private principal: Principal,
        private jhiLanguageHelper: JhiLanguageHelper,
        private router: Router
    ) {
        this.isHome = true;
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']);
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }

        if (title === 'home.title' || title === 'schoolarApp') {
            this.isHome = true;
        } else {

            this.isHome = false;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });

        // force the application to look for user authentication immediately
        this.principal.identity()
            .then(() => {
                this.securityReady = true;
            })
            .catch(() => {
                this.securityReady = true;
            });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
}
