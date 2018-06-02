import { TblSchool } from './../tbl-school/tbl-school.model';
import { TblSchoolNetworkSchool } from './../tbl-school-network-school/tbl-school-network-school.model';

import { TblSchoolNetworkSchoolService } from './../tbl-school-network-school/tbl-school-network-school.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TblSchoolNetwork } from './tbl-school-network.model';
import { TblSchoolService } from './../tbl-school/tbl-school.service';

import { TblSchoolNetworkPopupService } from './tbl-school-network-popup.service';
import { TblSchoolNetworkService } from './tbl-school-network.service';
import { TblPhone, TblPhoneService } from '../tbl-phone';
import { TblAddress, TblAddressService } from '../tbl-address';
import { ResponseWrapper } from '../../shared';
import * as moment from 'moment';

declare var componentHandler: any;

@Component({
    selector: 'jhi-tbl-school-network-dialog',
    templateUrl: './tbl-school-network-dialog.component.html',
    styleUrls: ['scss/tbl-school-network-dialog.scss']
})
export class TblSchoolNetworkDialogComponent implements OnInit {

    modelSearchInput = '';
    removeListSchool: any = [];
    associatedSchool: any = [];
    associatedSchoolCopy: any = [];
    schoolToAddList: any = [];
    isSaving: boolean;
    tblPhones: TblPhone[] = [];
    tblAddresses: TblAddress = new TblAddress();
    tblPhoneTemplate = new TblPhone();
    tblSchool = [];
    tblSchoolNetwork: TblSchoolNetwork = new TblSchoolNetwork();
    tblSchoolNetworkSchool: TblSchoolNetworkSchool = new TblSchoolNetworkSchool();

    strPhoneTypes = [
        { strPhoneType: 'Cell', jhiTranslate: 'schoolarApp.tblPhone.strPhoneTypes.Cell' },
        { strPhoneType: 'Residence', jhiTranslate: 'schoolarApp.tblPhone.strPhoneTypes.Residence' },
        { strPhoneType: 'Comercial', jhiTranslate: 'schoolarApp.tblPhone.strPhoneTypes.Comercial' },
        { strPhoneType: 'Others', jhiTranslate: 'schoolarApp.tblPhone.strPhoneTypes.Others' },
    ];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tblSchoolNetworkService: TblSchoolNetworkService,
        private tblSchoolNetworkSchoolService: TblSchoolNetworkSchoolService,
        private tblPhoneService: TblPhoneService,
        private tblAddressService: TblAddressService,
        private eventManager: JhiEventManager,
        private tblSchoolService: TblSchoolService
    ) {
        this.tblSchoolNetwork.tblAddresses = [];
        this.tblPhoneTemplate.strPhoneType = 'Cell';

    }

    ngOnInit() {
        this.isSaving = false;

        if (this.tblSchoolNetwork.id) {
            this.tblSchoolNetworkService.querySchools(this.tblSchoolNetwork.id)
                .subscribe((res: ResponseWrapper) => { this.associatedSchool = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
            this.tblSchoolNetworkService.querySchools(this.tblSchoolNetwork.id)
                .subscribe((res: ResponseWrapper) => { this.associatedSchoolCopy = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
            if (this.tblSchoolNetwork.tblPhones[0]) {
                this.tblPhones = this.tblSchoolNetwork.tblPhones;
            } else {
                this.tblPhones = [];
            }
            if (this.tblSchoolNetwork.tblAddresses[0]) {
                this.tblAddresses = this.tblSchoolNetwork.tblAddresses[0];
            }
        } else {
            this.addPhone();
        }
        // Update components css
        this.updateComponents();
        this.getAssoaciatedSchools(this.tblSchoolNetwork.id);
    }
    updateComponents() {
        setTimeout(() => {
            componentHandler.upgradeAllRegistered();
        }, 100);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.tblSchoolNetwork.intExcluded = 0;
        this.tblSchoolNetwork.dtmCreated = moment(new Date()).toDate().toISOString();
        this.tblSchoolNetwork.dtmLastUpdate = moment(new Date()).toDate().toISOString();
        this.isSaving = true;
        if (this.tblSchoolNetwork.id !== undefined) {
            this.tblSchoolNetwork.tblPhones = this.tblPhones;
            this.tblSchoolNetwork.tblAddresses[0] = this.tblAddresses;
            this.subscribeToSaveResponse(
                this.tblSchoolNetworkService.update(this.tblSchoolNetwork));
        } else {
            this.tblSchoolNetwork.tblPhones = this.tblPhones;
            this.tblAddresses.strLabel = 'und';
            this.tblAddresses.dtmCreate = moment(new Date()).toDate().toISOString();
            this.tblAddresses.intExcluded = 0;

            this.tblSchoolNetwork.tblAddresses = [this.tblAddresses];
            this.subscribeToSaveResponse(
                this.tblSchoolNetworkService.create(this.tblSchoolNetwork));
        }
        this.setAssociatedSchools();
        this.deleteAssociatedSchools();
    }

    private subscribeToSaveResponse(result: Observable<TblSchoolNetwork>) {
        result.subscribe((res: TblSchoolNetwork) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblSchoolNetwork) {
        this.eventManager.broadcast({ name: 'tblSchoolNetworkListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTblPhoneById(index: number, item: TblPhone) {
        return item.id;
    }

    trackTblAddressById(index: number, item: TblAddress) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }

    getAllSchools(name, limit) {
        this.tblSchoolService.querySchoolsByName(name, limit)
            .subscribe((res: ResponseWrapper) => { this.tblSchool = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    getAssoaciatedSchools(id) {
        for (let i = 0; i < this.associatedSchool.length; i++) {
        }
    }

    setAssociatedSchools() {
        this.tblSchoolNetwork.dtmCreated = new Date().toISOString;
        this.tblSchoolNetwork.dtmLastUpdate = new Date().toISOString;

        this.tblSchoolNetworkSchool.id = null;
        this.tblSchoolNetworkSchool.schoolNetwork = this.tblSchoolNetwork;
        this.tblSchoolNetworkSchool.dtmCreated = moment(new Date()).toDate().toISOString();
        this.tblSchoolNetworkSchool.dtmLastUpdate = moment(new Date()).toDate().toISOString();
        this.tblSchoolNetworkSchool.intExcluded = 0;

        for (let i = 0; i < this.associatedSchoolCopy.length; i++) {
            if (this.associatedSchool.length !== 0) {

                if (this.associatedSchool[i] === undefined || this.associatedSchoolCopy[i].id !== this.associatedSchool[i].id) {

                    this.tblSchoolNetworkSchool.school = this.associatedSchoolCopy[i];
                    this.subscribeToSaveResponse(
                        this.tblSchoolNetworkSchoolService.create(this.tblSchoolNetworkSchool));
                }
            }else {
                this.tblSchoolNetworkSchool.school = this.associatedSchoolCopy[i];
                this.subscribeToSaveResponse(
                    this.tblSchoolNetworkSchoolService.create(this.tblSchoolNetworkSchool));
            }
        }

    }
    deleteAssociatedSchools() {
        if (this.removeListSchool.length !== 0) {
            for (let i = 0; i < this.removeListSchool.length; i++) {
                if (this.removeListSchool[i].id) {
                    this.tblSchoolNetworkSchoolService.deleteBySchool(this.removeListSchool[i].id).subscribe((response) => {
                        this.eventManager.broadcast({
                            name: 'tblUserListModification',
                            content: 'Deleted an tblSchoolNetworkSchool'
                        });
                        this.activeModal.dismiss(true);
                    });
                }
            }
        }
        this.removeListSchool = [];
    }
    searchSchoolsEnter(e: KeyboardEvent, name) {
        if (e.keyCode === 13) {
            this.getAllSchools(name, 25);
        }

    }
    searchSchools(name) {

        if (name.length >= 1) {
            this.getAllSchools(name, 25);
        }
    }
    removeAssociatedSchoolList(id, school) {
        this.associatedSchoolCopy.splice(id, 1);
        this.removeListSchool.push(school);

    }
    removeSetAssociated(id) {
        this.tblSchoolNetworkSchoolService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tblUserListModification',
                content: 'Deleted an tblUser'
            });
            this.activeModal.dismiss(true);
        });
    }
    addPhone() {
        const copy = { ...this.tblPhoneTemplate };
        this.tblPhones.push(copy);
        this.updateComponents();
    }

    removePhone(i) {
        if (this.tblPhones.length > 1) {
            this.tblPhones.splice(i, 1);
        }
    }

    addToInsertList(e: HTMLInputElement, school) {
        if (e.checked) {
            this.associatedSchoolCopy.push(school);
        } else {
            const index = this.schoolToAddList.findIndex((x) => x.id === school.id);
            this.associatedSchoolCopy.splice(index, 1);
        }

    }
    alreadyInsertedSchool(school) {
        for (let i = 0; i < this.associatedSchoolCopy.length; i++) {
            if (this.associatedSchoolCopy[i].id === school.id) {
                return true;
            }
        }
        return false;
    }

    collapseAccordion() {
        const arrow = document.getElementById('arrow_accordion');
        const classes = arrow.classList;
        if (classes[4]) {
            arrow.classList.remove('arrow-rotate');
        } else {
            arrow.classList.add('arrow-rotate');
        }
    }
}

@Component({
    selector: 'jhi-tbl-school-network-popup',
    template: ''
})
export class TblSchoolNetworkPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tblSchoolNetworkPopupService: TblSchoolNetworkPopupService
    ) { }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.tblSchoolNetworkPopupService
                    .open(TblSchoolNetworkDialogComponent as Component, params['id']);
            } else {
                this.tblSchoolNetworkPopupService
                    .open(TblSchoolNetworkDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
