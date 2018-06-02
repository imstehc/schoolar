import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblUserComponent } from './tbl-user.component';
import { TblUserDetailComponent } from './tbl-user-detail.component';
import { TblUserPopupComponent } from './tbl-user-dialog.component';
import { TblUserDeletePopupComponent } from './tbl-user-delete-dialog.component';

export const tblUserRoute: Routes = [
    {
        path: 'tbl-user',
        component: TblUserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-user/:id',
        component: TblUserDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblUserPopupRoute: Routes = [
    {
        path: 'tbl-user-new',
        component: TblUserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-user/:id/edit',
        component: TblUserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-user/:id/delete',
        component: TblUserDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
