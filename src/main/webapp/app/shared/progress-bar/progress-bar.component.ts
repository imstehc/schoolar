import { Component, OnInit } from '@angular/core';

/**
 * @description for displaying the progress bar use window['SchoolarEvents'].publish('showLoading')
 * and window['SchoolarEvents'].publish('hideLoading') for hiding it.
 * Included in app.main.js
*/

@Component({
  selector: 'jhi-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    window['SchoolarEvents'].subscribe('showLoading', this.show.bind(this));
    window['SchoolarEvents'].subscribe('hideLoading', this.hide.bind(this));
  }

  hide() {
    const loadbar = document.getElementById('barLoad');
    loadbar.classList.remove('show-barLoad');
    loadbar.classList.add('hide-barLoad');
  }

  show() {
    const loadbar = document.getElementById('barLoad');
    loadbar.classList.remove('hide-barLoad');
    loadbar.classList.add('show-barLoad');
  }
}
