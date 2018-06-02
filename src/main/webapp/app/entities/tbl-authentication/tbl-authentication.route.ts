import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblAuthenticationComponent } from './tbl-authentication.component';
import { TblAuthenticationDetailComponent } from './tbl-authentication-detail.component';
import { TblAuthenticationPopupComponent } from './tbl-authentication-dialog.component';
import { TblAuthenticationDeletePopupComponent } from './tbl-authentication-delete-dialog.component';

export const tblAuthenticationRoute: Routes = [
    {
        path: 'tbl-authentication',
        component: TblAuthenticationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblAuthentication.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-authentication/:id',
        component: TblAuthenticationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblAuthentication.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblAuthenticationPopupRoute: Routes = [
    {
        path: 'tbl-authentication-new',
        component: TblAuthenticationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblAuthentication.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-authentication/:id/edit',
        component: TblAuthenticationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblAuthentication.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-authentication/:id/delete',
        component: TblAuthenticationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblAuthentication.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
