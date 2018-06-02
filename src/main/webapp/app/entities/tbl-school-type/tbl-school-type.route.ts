import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblSchoolTypeComponent } from './tbl-school-type.component';
import { TblSchoolTypeDetailComponent } from './tbl-school-type-detail.component';
import { TblSchoolTypePopupComponent } from './tbl-school-type-dialog.component';
import { TblSchoolTypeDeletePopupComponent } from './tbl-school-type-delete-dialog.component';

export const tblSchoolTypeRoute: Routes = [
    {
        path: 'tbl-school-type',
        component: TblSchoolTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-school-type/:id',
        component: TblSchoolTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblSchoolTypePopupRoute: Routes = [
    {
        path: 'tbl-school-type-new',
        component: TblSchoolTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-school-type/:id/edit',
        component: TblSchoolTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-school-type/:id/delete',
        component: TblSchoolTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblSchoolType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
