import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblAddressComponent } from './tbl-address.component';
import { TblAddressDetailComponent } from './tbl-address-detail.component';
import { TblAddressPopupComponent } from './tbl-address-dialog.component';
import { TblAddressDeletePopupComponent } from './tbl-address-delete-dialog.component';

export const tblAddressRoute: Routes = [
    {
        path: 'tbl-address',
        component: TblAddressComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblAddress.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-address/:id',
        component: TblAddressDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblAddress.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblAddressPopupRoute: Routes = [
    {
        path: 'tbl-address-new',
        component: TblAddressPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblAddress.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-address/:id/edit',
        component: TblAddressPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblAddress.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-address/:id/delete',
        component: TblAddressDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblAddress.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
