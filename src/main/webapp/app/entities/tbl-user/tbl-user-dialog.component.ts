import { TblSchool } from './../tbl-school/tbl-school.model';
import { TblGuardianType } from './../tbl-guardian-type/tbl-guardian-type.model';
import { TblGuardianTypeService } from './../tbl-guardian-type/tbl-guardian-type.service';
import { TblLogin } from './../tbl-login/tbl-login.model';
import { TblGuardian } from './../tbl-guardian/tbl-guardian.model';
import { TblGuardianService } from './../tbl-guardian/tbl-guardian.service';
import { TblNfc } from './../tbl-nfc/tbl-nfc.model';
import { TblNfcService } from './../tbl-nfc/tbl-nfc.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/throw';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { TblUserDTO } from './tbl-user.model';
import { TblUserPopupService } from './tbl-user-popup.service';
import { TblUserService } from './tbl-user.service';
import { TblPhone } from '../tbl-phone';
import { TblAddress } from '../tbl-address';
import { ResponseWrapper } from '../../shared';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { TblRole } from '../tbl-role';
import { TblSchoolUserRole } from '../tbl-school-user-role/tbl-school-user-role.model';
import { NgForm } from '@angular/forms';
import { TblUserLoginsComponent } from './snippets/tbl-user-logins/tbl-user-logins.component';

declare var jQuery: any;
declare var $: any;
declare var componentHandler: any;

const NOT_EXCLUDED = 0;
const EXCLUDED = 1;

@Component({
    selector: 'jhi-tbl-user-dialog',
    templateUrl: './tbl-user-dialog.component.html',
    styleUrls: [
        'scss/tbl-user-dialog.scss'
    ]
})

export class TblUserDialogComponent implements OnInit {
    private childFormValidCheck: boolean;
    editForm: NgForm;
    tblGuardianType: TblGuardianType[];
    logins: TblLogin[];
    toggleDropList = false;
    strSearchAssociated: any = [];
    tblDependent: TblUserDTO = new TblUserDTO();
    dependentsUser: any = [];
    tblGuardian: TblGuardian = new TblGuardian();

    tblRoles: TblRole = new TblRole();
    tblUser: TblUserDTO = new TblUserDTO();
    tblUserToAdd: TblUserDTO[] = [];
    isSaving: boolean;

    tblPhones: TblPhone[] = [];
    isInvalidPhone: Boolean = false;

    maxBirthday: any = new Date();

    tblPhoneTemplate = new TblPhone();

    nfcs: TblNfc[] = [];
    tblNfcTemplate = new TblNfc();
    nfcToRemove: any = [];
    dependentsUserOld: any = [];
    dependentsToRemove: any = [];
    tblSchoolUserRole: TblSchoolUserRole[];

    strPhoneTypes = [
        { strPhoneType: 'Cell', jhiTranslate: 'schoolarApp.tblPhone.strPhoneTypes.Cell' },
        { strPhoneType: 'Residence', jhiTranslate: 'schoolarApp.tblPhone.strPhoneTypes.Residence' },
        { strPhoneType: 'Comercial', jhiTranslate: 'schoolarApp.tblPhone.strPhoneTypes.Comercial' },
        { strPhoneType: 'Others', jhiTranslate: 'schoolarApp.tblPhone.strPhoneTypes.Others' },
    ];

    labelAddress: any;
    labelPhone: any;
    age: any;
    iADULT_WITH_NO_CPFsSaving: any;
    iADULT_WITH_NO_EMAILsSaving: any;
    isErrorCpf: any;
    isErrorEmail: any;
    constructor(
        private tblNfcService: TblNfcService,
        private tblGuardianService: TblGuardianService,
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tblUserService: TblUserService,
        private eventManager: JhiEventManager,
        private tblGuardianTypeService: TblGuardianTypeService,
        private translate: TranslateService
    ) {
        this.dependentsUserOld = [];
        this.tblPhoneTemplate.strPhoneType = 'Cell';
    }

    ngOnInit() {
        this.iADULT_WITH_NO_CPFsSaving = false;
        this.iADULT_WITH_NO_EMAILsSaving = false;
        this.isSaving = false;
        if (this.tblUser.id) {
            this.tblGuardianService.queryByGuardian(this.tblUser.id)
                .subscribe((res: any) => {
                    this.tblUser.tblUsers = res.json;
                }, (res: any) => this.onError(res.json));

            this.tblNfcService.queryByUserId(this.tblUser.id)
                .subscribe((res: any) => {
                    this.tblUser.nfcs = res.json;
                }, (res: any) => this.onError(res.json));

            this.tblGuardianService.queryByGuardian(this.tblUser.id)
                .subscribe((res: any) => {
                    this.dependentsUserOld = res.json;
                }, (res: any) => this.onError(res.json));
            if (this.tblUser.tblPhones) {
                this.tblPhones = this.tblUser.tblPhones;
            }
            this.tblUser.dtmBirthday = new Date(this.tblUser.dtmBirthday).toISOString().slice(0, 10);
            this.updateComponents();

            this.tblUserService.getLoginsByUser(this.tblUser.id)
                .subscribe((res: any) => {
                    this.tblUser.logins = res.json;
                }, (res: any) => this.onError(res.json));
        } else {
            this.tblUser.logins = [];
            this.translateString();
            this.tblUser.dtmBirthday = new Date();
            this.tblUser.tblAddresses = [new TblAddress()];
            this.tblUser.tblPhones = [new TblPhone(undefined, this.labelPhone)];
            this.tblUser.nfcs = [new TblNfc()];
            this.tblUser.tblUsers = [];
            this.tblUser.tblSchoolUserRole = [];
            this.updateComponents();
        }
        this.tblGuardianTypeService.query()
            .subscribe((res: ResponseWrapper) => {
                this.tblGuardianType = res.json;
            }, (res: any) => this.onError(res.json));

    }

    checkDisablePhone() {
        if (this.tblUser.tblGuardianType === 0) {
            this.isInvalidPhone = true;
        }
    }

    translateString() {
        this.translate.get('schoolarApp.tblAddress.newAddress').subscribe((res) => {
            this.labelAddress = res;
        });

        this.translate.get('schoolarApp.tblPhones.newPhone').subscribe((res) => {
            this.labelPhone = res;
        });
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
        window['SchoolarEvents'].publish('showLoading');
        this.tblUser.intExcluded = NOT_EXCLUDED;
        if (this.tblUser.id !== undefined) {
            this.tblUser.dtmBirthday = moment(this.tblUser.dtmBirthday).toDate().toISOString();
            this.deleteDependents();
            this.subscribeToSaveResponse(
                this.tblUserService.update(this.tblUser));
        } else {
            this.tblUser.dtmBirthday = moment(this.tblUser.dtmBirthday).toDate().toISOString();
            this.subscribeToSaveResponse(
                this.tblUserService.create(this.tblUser));
        }
    }

    emitForm(e) {

        this.editForm = e;
    }

    private subscribeToSaveResponse(result: Observable<TblUserDTO>) {
        result.subscribe((res: TblUserDTO) =>
            this.onSaveSuccess(res), (error: Response) => this.onSaveError(error));
    }

    private onSaveSuccess(result: TblUserDTO) {
        this.eventManager.broadcast({ name: 'tblUserListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
        window['SchoolarEvents'].publish('hideLoading');
    }

    private onSaveError(error) {
        let body: any;
        this.isSaving = false;
        body = error.json();
        if (body.errorKey === 'ADULT_WITH_NO_CPF') {
            this.iADULT_WITH_NO_CPFsSaving = true;
        } else {
            if (body.errorKey === 'ADULT_WITH_NO_EMAIL') {
                this.iADULT_WITH_NO_EMAILsSaving = true;
            }
        }
        this.tblUser.dtmBirthday = new Date(this.tblUser.dtmBirthday).toISOString().slice(0, 10);
        window['SchoolarEvents'].publish('hideLoading');
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

    getUsers(e: HTMLInputElement) {
        if (e.value.length > 1) {
            const timer = setInterval(() => {
                this.tblUserService.querybyName(e.value, 10)
                    .subscribe((res: any) => {
                        this.tblUserToAdd = res.json;
                    }, (res: any) => this.onError(res.json));
            }, 1000);
            setTimeout(() => {
                clearInterval(timer)
            }, 1001);
        }
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

    addDependent(user: TblUserDTO) {
        user.tblGuardianType = new TblGuardianType(null, 'Select Type', 'Select Type', new Date());

        if (this.tblUser.tblUsers.length > 0) {
            const filter = this.tblUser.tblUsers.filter(function(e) {
                return e.id !== user.id;
            });
            this.tblUser.tblUsers = filter;
            this.tblUser.tblUsers.push(user);
        } else {
            this.tblUser.tblUsers.push(user);
        }
    }

    removeDependent(i, user?) {
        this.tblUser.tblUsers.splice(i, 1);
        this.dependentsToRemove.push(user);
    }

    deleteDependents() {
        for (let i = 0; i < this.dependentsToRemove.length; i++) {
            this.tblGuardianService.delete(this.dependentsToRemove[i].id).subscribe();
        }
    }

    addNfc() {
        const copy = { ...this.tblNfcTemplate };
        this.tblUser.nfcs.push(new TblNfc());
        this.updateComponents();
    }

    removeNfc(i, item?) {
        this.tblUser.nfcs.splice(i, 1);
        this.nfcToRemove.push(item);
    }

    addPhone() {
        const copy = { ...this.tblPhoneTemplate };
        this.tblUser.tblPhones.push(new TblPhone());
        this.updateComponents();
    }

    removePhone(i) {
        if (this.tblUser.tblPhones.length > 1) {
            this.tblUser.tblPhones.splice(i, 1);
        }
    }

    showtoggleDropList() {
        this.toggleDropList = true;
    }

    hidetoggleDropList() {
        document.addEventListener('click', (event) => {
            if (event.toElement.className === 'list-group-item dropcomplete' || event.toElement.id === 'SearchAssociated') {
                this.toggleDropList = true;
            } else {
                this.toggleDropList = false;
            }
        });
    }

    checkInput() {
        if (this.tblUser.strCPF !== undefined) {
            if (this.tblUser.strCPF.length < 11) {
                this.isErrorCpf = true;
            } else {
                this.isErrorCpf = false;
            }
        }

        if (this.tblUser.strEmail !== undefined) {
            if (this.tblUser.strEmail.length <= 0) {
                this.isErrorEmail = true;
            } else {
                this.isErrorEmail = false;
            }
        }
    }
}

@Component({
    selector: 'jhi-tbl-user-popup',
    template: ''
})
export class TblUserPopupComponent implements OnInit, OnDestroy {
    ''
    routeSub: any;

    constructor(private route: ActivatedRoute,
        private tblUserPopupService: TblUserPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.tblUserPopupService
                    .open(TblUserDialogComponent as Component, params['id']);
            } else {
                this.tblUserPopupService
                    .open(TblUserDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
