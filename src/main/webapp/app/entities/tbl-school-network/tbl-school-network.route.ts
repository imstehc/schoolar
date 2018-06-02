import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblSchoolNetworkComponent } from './tbl-school-network.component';
import { TblSchoolNetworkDetailComponent } from './tbl-school-network-detail.component';
import { TblSchoolNetworkPopupComponent } from './tbl-school-network-dialog.component';
import { TblSchoolNetworkDeletePopupComponent } from './tbl-school-network-delete-dialog.component';

export const tblSchoolNetworkRoute: Routes = [
    {
        path: 'tbl-school-network',
        component: TblSchoolNetworkComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolNetwork.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-school-network/:id',
        component: TblSchoolNetworkDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolNetwork.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblSchoolNetworkPopupRoute: Routes = [
    {
        path: 'tbl-school-network-new',
        component: TblSchoolNetworkPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolNetwork.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-school-network/:id/edit',
        component: TblSchoolNetworkPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolNetwork.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-school-network/:id/delete',
        component: TblSchoolNetworkDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolNetwork.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
