import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblSchool } from './tbl-school.model';
import { TblSchoolService } from './tbl-school.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tbl-school',
    templateUrl: './tbl-school.component.html',
    styleUrls: ['scss/tbl-school.scss']
})
export class TblSchoolComponent implements OnInit {
tblSchools: TblSchool[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tblSchoolService: TblSchoolService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tblSchoolService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tblSchools = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTblSchools();
    }

    trackId(index: number, item: TblSchool) {
        return item.id;
    }

    getCnpjMask(cnpj: string) {
        return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    registerChangeInTblSchools() {
        this.eventSubscriber = this.eventManager.subscribe('tblSchoolListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
