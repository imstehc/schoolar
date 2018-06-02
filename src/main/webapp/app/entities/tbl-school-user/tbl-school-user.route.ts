import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblSchoolUserComponent } from './tbl-school-user.component';
import { TblSchoolUserDetailComponent } from './tbl-school-user-detail.component';
import { TblSchoolUserPopupComponent } from './tbl-school-user-dialog.component';
import { TblSchoolUserDeletePopupComponent } from './tbl-school-user-delete-dialog.component';

export const tblSchoolUserRoute: Routes = [
    {
        path: 'tbl-school-user',
        component: TblSchoolUserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-school-user/:id',
        component: TblSchoolUserDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblSchoolUserPopupRoute: Routes = [
    {
        path: 'tbl-school-user-new',
        component: TblSchoolUserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-school-user/:id/edit',
        component: TblSchoolUserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-school-user/:id/delete',
        component: TblSchoolUserDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
