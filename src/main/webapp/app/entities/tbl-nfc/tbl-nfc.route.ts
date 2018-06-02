import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblNfcComponent } from './tbl-nfc.component';
import { TblNfcDetailComponent } from './tbl-nfc-detail.component';
import { TblNfcPopupComponent } from './tbl-nfc-dialog.component';
import { TblNfcDeletePopupComponent } from './tbl-nfc-delete-dialog.component';

export const tblNfcRoute: Routes = [
    {
        path: 'tbl-nfc',
        component: TblNfcComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblNfc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-nfc/:id',
        component: TblNfcDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblNfc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblNfcPopupRoute: Routes = [
    {
        path: 'tbl-nfc-new',
        component: TblNfcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblNfc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-nfc/:id/edit',
        component: TblNfcPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblNfc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-nfc/:id/delete',
        component: TblNfcDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblNfc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
