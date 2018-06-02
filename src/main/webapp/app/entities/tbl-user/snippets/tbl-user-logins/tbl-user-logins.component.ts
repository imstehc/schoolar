import { TblUserDTO } from './../../tbl-user.model';
import { TblUserService } from './../../tbl-user.service';
import { Component, OnInit, Input } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';
import { TblLogin } from '../../../tbl-login/tbl-login.model';
import {
    FormControl, NgForm, NG_VALIDATORS, Validator,
    Validators, AbstractControl, ValidatorFn, ControlContainer
} from '@angular/forms';
import { TblSchoolHistoryService } from '../../../tbl-school-history';

@Component({
    selector: 'jhi-tbl-user-logins',
    templateUrl: './tbl-user-logins.component.html',
    styleUrls: ['tbl-user-logins.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class TblUserLoginsComponent implements OnInit {
    schoolarpass = 'schoolarPass';
    isSaving: boolean;
    @Input() tblLogins: TblLogin[];
    @Input() editForm: NgForm;
    @Input() tblUser: TblUserDTO;
    loginPatern: any;

    constructor(private tblUserService: TblUserService, public jhiAlertService: JhiAlertService) {
    }

    ngOnInit() {

    }

    addLogin() {
        const _login = new TblLogin();
        _login.id = null;
        _login.strFirstName = this.tblUser.strFirstName;
        _login.strLastName = this.tblUser.strLastName;
        _login.dtmLastUpdate = new Date();
        _login.userStrEmail = null;
        this.tblLogins.push(_login);
    }

    removeLogin(i) {
        this.tblLogins.splice(i, 1);
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
