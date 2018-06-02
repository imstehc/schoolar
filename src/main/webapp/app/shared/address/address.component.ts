import { Component, OnInit, Input, Directive, AfterViewChecked } from '@angular/core';
import { TblAddress } from '../../entities/tbl-address';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap/accordion/accordion-config';
import {NgbAccordion, NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap/accordion/accordion';

declare var jQuery: any;
declare var $: any;

declare var componentHandler: any;
let isFocused: any;
// let labelAddress: any;

@Component({
  selector: 'jhi-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  providers: [NgbAccordionConfig]
})

export class AddressComponent implements OnInit, AfterViewChecked {
  @Input() tblAddresses: TblAddress[];
  @Input() editForm;
  ngAfterViewChecked() {
    if (componentHandler) {
      componentHandler.upgradeAllRegistered();
    }
  }

  constructor(private translate: TranslateService, public config: NgbAccordionConfig) {
    this.config.closeOthers = true;
  }

  ngOnInit() {
    if (!this.tblAddresses) {
      this.tblAddresses = [];
      this.addAddress();
    }
  }

  getFocused(i?, e?: HTMLInputElement) {
    if (i) {
      isFocused = i;
    } else {
      isFocused = 'a';
    }
  }

  addAddress() {
    const address = new TblAddress();
    address.dtmCreate = moment(new Date).toDate().toISOString();
    address.dtmLastUpdate = moment(new Date).toDate().toISOString();
    address.id = undefined;
    this.tblAddresses.push(address);
  }

  removeAddress(i) {
    this.tblAddresses.splice(i, 1);
  }

  toggleAccordion(i) {
    const item = document.getElementById(i);
    if (item.classList[2] === 'rotate90') {
      item.classList.remove('rotate90');
    } else {
      item.classList.add('rotate90');
    }
    componentHandler.upgradeAllRegistered();
  }

}
