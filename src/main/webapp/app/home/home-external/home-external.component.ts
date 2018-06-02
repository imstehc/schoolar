import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../shared/login/login.service';
import {JhiEventManager} from 'ng-jhipster';
import {StateStorageService} from '../../shared/auth/state-storage.service';
import {Principal} from '../../shared/auth/principal.service';

declare var componentHandler: any;

@Component({
    selector: 'jhi-home-external',
    templateUrl: './home-external.component.html',
    styleUrls: ['home-external.scss']
})
export class HomeExternalComponent implements OnInit {
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    isLoading: boolean;
    username: string;
    credentials: any;

    constructor(private router: Router,
                private eventManager: JhiEventManager,
                private loginService: LoginService,
                private principal: Principal,
                private stateStorageService: StateStorageService) { }

    ngOnInit() {
        // componentHandler.upgradeAllRegistered();
    }

    login() {
        this.isLoading = true;
        this.loginService.login({
            username: this.username,
            password: this.password,
            rememberMe: this.rememberMe
        }).then(() => {
            this.isLoading = false;
            this.authenticationError = false;
            if (this.router.url === '/register' || (/^\/activate\//.test(this.router.url)) ||
                (/^\/reset\//.test(this.router.url))) {
                this.router.navigate(['']);
            }

            this.eventManager.broadcast({
                name: 'authenticationSuccess',
                content: 'Sending Authentication Success'
            });

            // force the application to look for user authentication immediately
            this.principal.identity()
                .then(() => {
                    // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                    // // since login is succesful, go to stored previousState and clear previousState
                    const redirect = this.stateStorageService.getUrl();
                    if (redirect) {
                        this.stateStorageService.storeUrl(null);
                        this.router.navigate([redirect]);
                    }
                });

        }).catch(() => {
            this.isLoading = false;
            this.authenticationError = true;
        });
    }

    register() {
        // TODO: uncomment the line bellow and make it work
        // this.router.navigate(['/register']);
    }

    requestResetPassword() {
        // TODO: uncomment the line bellow and make it work
        // this.router.navigate(['/reset', 'request']);
    }

}
