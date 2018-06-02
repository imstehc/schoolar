import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblAuthenticateComponent } from './tbl-authenticate.component';
import { TblAuthenticateDetailComponent } from './tbl-authenticate-detail.component';
import { TblAuthenticatePopupComponent } from './tbl-authenticate-dialog.component';
import { TblAuthenticateDeletePopupComponent } from './tbl-authenticate-delete-dialog.component';

export const tblAuthenticateRoute: Routes = [
    {
        path: 'tbl-authenticate',
        component: TblAuthenticateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblAuthenticate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-authenticate/:id',
        component: TblAuthenticateDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblAuthenticate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblAuthenticatePopupRoute: Routes = [
    {
        path: 'tbl-authenticate-new',
        component: TblAuthenticatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblAuthenticate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-authenticate/:id/edit',
        component: TblAuthenticatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblAuthenticate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-authenticate/:id/delete',
        component: TblAuthenticateDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblAuthenticate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
