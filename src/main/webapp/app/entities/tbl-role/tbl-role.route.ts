import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblRoleComponent } from './tbl-role.component';
import { TblRoleDetailComponent } from './tbl-role-detail.component';
import { TblRolePopupComponent } from './tbl-role-dialog.component';
import { TblRoleDeletePopupComponent } from './tbl-role-delete-dialog.component';

export const tblRoleRoute: Routes = [
    {
        path: 'tbl-role',
        component: TblRoleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblRole.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-role/:id',
        component: TblRoleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblRole.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblRolePopupRoute: Routes = [
    {
        path: 'tbl-role-new',
        component: TblRolePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblRole.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-role/:id/edit',
        component: TblRolePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblRole.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-role/:id/delete',
        component: TblRoleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblRole.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
