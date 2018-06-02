import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { TblUserPage, TblUserDTO } from './tbl-user.model';
import { TblUserService } from './tbl-user.service';
import { Principal, ResponseWrapper } from '../../shared';
@Component({
    selector: 'jhi-tbl-user',
    templateUrl: './tbl-user.component.html',
    styleUrls: ['scss/tbl-user.scss']
})
export class TblUserComponent implements OnInit {
    pagesQtd = 149;
    pageOffSet = { start: 0, end: 10 };
    pageList: Array<number>;
    usersPage: TblUserPage;
    currentAccount: any;
    eventSubscriber: Subscription;
    msgLoadind: any = true;
    private isConsented = false;
    private currentPage = 1;
    public filter = '';
    constructor(

        private tblUserService: TblUserService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
    ) { }

    showBar() { }

    hideBar() { }

    loadAll(page: number) {
        window['SchoolarEvents'].publish('showLoading');
        const req = {
            filter: this.filter,
            page: page - 1,
            size: 10
        };
        this.tblUserService.query(req).subscribe(
            (res: ResponseWrapper) => {
                this.msgLoadind = false;
                this.usersPage = res.json;
                this.currentPage = this.usersPage.number + 1;
                window['SchoolarEvents'].publish('hideLoading');
            },
            (res: ResponseWrapper) => {
                this.onError(res.json);
                window['SchoolarEvents'].publish('hideLoading');
            }
        );
    }

    ngOnInit() {
        this.setPageNumbers(this.pagesQtd, 1);

        this.loadAll(this.currentPage);
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblUsers();
    }

    filterByName(e: HTMLInputElement) {
        if (e.value.length > 2 || !e.value) {
            const timer = setInterval(() => {
                this.loadAll(1);
            }, 2000);
            setTimeout(() => {
                clearInterval(timer)
            }, 2001);
        }
    }

    trackId(index: number, item: TblUserDTO) {
        return item.id;
    }

    registerChangeInTblUsers() {
        this.eventSubscriber = this.eventManager.subscribe('tblUserListModification', (response) => this.loadAll(this.currentPage));
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    loadPage(nextPage: number) {
        this.loadAll(this.currentPage);
    }
    changePage(page) {
        this.loadAll(page);
        this.currentPage = page
    }
    setPageNumbers(pgQtd?, _slice = 0) {
        this.pageList = Array(pgQtd + _slice).fill(4).map((x, i) => i); // [0,1,2,3,4]
        this.pageList = this.pageList.slice(1);
    }
    incrementPages(n) {
        this.currentPage = this.pageOffSet.start;
        this.pageOffSet.start += n;
        this.pageOffSet.end += n;
    }
}
