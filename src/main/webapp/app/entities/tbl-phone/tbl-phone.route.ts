import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblPhoneComponent } from './tbl-phone.component';
import { TblPhoneDetailComponent } from './tbl-phone-detail.component';
import { TblPhonePopupComponent } from './tbl-phone-dialog.component';
import { TblPhoneDeletePopupComponent } from './tbl-phone-delete-dialog.component';

export const tblPhoneRoute: Routes = [
    {
        path: 'tbl-phone',
        component: TblPhoneComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblPhone.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-phone/:id',
        component: TblPhoneDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblPhone.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblPhonePopupRoute: Routes = [
    {
        path: 'tbl-phone-new',
        component: TblPhonePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblPhone.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-phone/:id/edit',
        component: TblPhonePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblPhone.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-phone/:id/delete',
        component: TblPhoneDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblPhone.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
