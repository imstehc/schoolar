import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblSchoolUserRoleComponent } from './tbl-school-user-role.component';
import { TblSchoolUserRoleDetailComponent } from './tbl-school-user-role-detail.component';
import { TblSchoolUserRolePopupComponent } from './tbl-school-user-role-dialog.component';
import { TblSchoolUserRoleDeletePopupComponent } from './tbl-school-user-role-delete-dialog.component';

export const tblSchoolUserRoleRoute: Routes = [
    {
        path: 'tbl-school-user-role',
        component: TblSchoolUserRoleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolUserRole.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-school-user-role/:id',
        component: TblSchoolUserRoleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolUserRole.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblSchoolUserRolePopupRoute: Routes = [
    {
        path: 'tbl-school-user-role-new',
        component: TblSchoolUserRolePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolUserRole.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-school-user-role/:id/edit',
        component: TblSchoolUserRolePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolUserRole.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-school-user-role/:id/delete',
        component: TblSchoolUserRoleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolUserRole.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
