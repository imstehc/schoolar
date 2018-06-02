import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiAlertService} from 'ng-jhipster';

import {TblSchool} from './tbl-school.model';
import {TblSchoolPopupService} from './tbl-school-popup.service';
import {TblSchoolService} from './tbl-school.service';
import {TblAddress} from '../tbl-address';
import {TblPhone} from '../tbl-phone';
import {TblSchoolTypeService} from '../tbl-school-type/tbl-school-type.service';
import {ResponseWrapper} from '../../shared';

import {TblSchoolType} from '../tbl-school-type/tbl-school-type.model';

declare var jQuery: any;
declare var $: any;

declare var componentHandler: any;

@Component({
    selector: 'jhi-tbl-school-dialog',
    templateUrl: './tbl-school-dialog.component.html',
    styleUrls: ['scss/tbl-school-dialog.scss']
})
export class TblSchoolDialogComponent implements OnInit {

    andress: any = {};

    tblSchool: TblSchool = new TblSchool();
    isSaving: boolean;
    tblSchoolTypeDependencyResolved: Boolean = false;
    tblAddresses = new TblAddress();
    tblPhoneTemplate = new TblPhone();
    tblPhones: TblPhone[] = [];
    isInvalidPhone: Boolean = false;
    idSchoolTypeSelected: number;

    strPhoneTypes = [
        {strPhoneType: 'Cell', jhiTranslate: 'schoolarApp.tblPhone.strPhoneTypes.Cell'},
        {strPhoneType: 'Residence', jhiTranslate: 'schoolarApp.tblPhone.strPhoneTypes.Residence'},
        {strPhoneType: 'Comercial', jhiTranslate: 'schoolarApp.tblPhone.strPhoneTypes.Comercial'},
        {strPhoneType: 'Others', jhiTranslate: 'schoolarApp.tblPhone.strPhoneTypes.Others'},
    ];
    strSelectType = {
        selectSchoolType: 'Select School type',
        jhiTranslate: 'schoolarApp.tblSchool.form.selectSchoolType'
    };
    schoolTypes: Array<TblSchoolType> = [];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private tblSchoolService: TblSchoolService,
                private tblSchoolTypeService: TblSchoolTypeService,
                private eventManager: JhiEventManager) {
        this.tblSchool.tblAddresses = [];
        this.tblPhoneTemplate.strPhoneType = 'Cell';
        this.addPhone();
        this.resolveTblSchoolTypeDependency();
    }

    ngOnInit() {
        this.isSaving = false;

        if (this.tblSchool.id) {
            this.tblAddresses = this.tblSchool.tblAddresses[0];
            if (this.tblSchool.tblPhones) {
                this.tblPhones = this.tblSchool.tblPhones;
            }
            this.updateComponents();
        } else {
            this.updateComponents();
        }
    }

    checkDisablePhone() {
        for (let i = 0; i < this.tblPhones.length; i++) {
            const value = this.tblPhones[i];

            if (!value.strPrefix || !value.strNumber || !value.strLabel) {
                this.isInvalidPhone = true;
                break;
            }
        }
    }

    updateComponents() {
        setTimeout(() => {
            componentHandler.upgradeAllRegistered();
        }, 100);

        this.checkDisablePhone();
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.tblSchool.schoolType = this.schoolTypes.find((schoolType) => (schoolType.id === +this.idSchoolTypeSelected));
        if (this.tblSchool.id === undefined) {
            this.tblSchool.tblAddresses = [this.tblAddresses];
            this.tblSchool.tblPhones = this.tblPhones;
            this.subscribeToSaveResponse(
                this.tblSchoolService.create(this.tblSchool));
        } else {
            this.subscribeToSaveResponse(
                this.tblSchoolService.update(this.tblSchool));
        }
    }

    private subscribeToSaveResponse(result: Observable<TblSchool>) {
        result.subscribe((res: TblSchool) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TblSchool) {
        this.eventManager.broadcast({name: 'tblSchoolListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTblAddressById(index: number, item: TblAddress) {
        return item.id;
    }

    trackTblPhoneById(index: number, item: TblPhone) {
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

    addPhone() {
        const copy = {...this.tblPhoneTemplate};
        this.tblPhones.push(copy);
        this.updateComponents();
    }

    removePhone(i) {
        if (this.tblPhones.length > 1) {
            this.tblPhones.splice(i, 1);
            setTimeout(() => {
                componentHandler.upgradeAllRegistered();
            }, 100);
        }
    }

    private resolveTblSchoolTypeDependency() {
        this.tblSchoolTypeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.schoolTypes = res.json;
                this.tblSchoolTypeDependencyResolved = true;
                if (this.tblSchool.id !== undefined) {
                    this.idSchoolTypeSelected = +this.tblSchool.schoolType.id;
                }
                this.updateComponents();
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
}

@Component({
    selector: 'jhi-tbl-school-popup',
    template: ''
})
export class TblSchoolPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private tblSchoolPopupService: TblSchoolPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.tblSchoolPopupService
                    .open(TblSchoolDialogComponent as Component, params['id']);
            } else {
                this.tblSchoolPopupService
                    .open(TblSchoolDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
