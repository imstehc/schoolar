import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblLoginComponent } from './tbl-login.component';
import { TblLoginDetailComponent } from './tbl-login-detail.component';
import { TblLoginPopupComponent } from './tbl-login-dialog.component';
import { TblLoginDeletePopupComponent } from './tbl-login-delete-dialog.component';

export const tblLoginRoute: Routes = [
    {
        path: 'tbl-login',
        component: TblLoginComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblLogin.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-login/:id',
        component: TblLoginDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblLogin.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblLoginPopupRoute: Routes = [
    {
        path: 'tbl-login-new',
        component: TblLoginPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblLogin.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-login/:id/edit',
        component: TblLoginPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblLogin.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-login/:id/delete',
        component: TblLoginDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblLogin.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
