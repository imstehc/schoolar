import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblShiftTypeComponent } from './tbl-shift-type.component';
import { TblShiftTypeDetailComponent } from './tbl-shift-type-detail.component';
import { TblShiftTypePopupComponent } from './tbl-shift-type-dialog.component';
import { TblShiftTypeDeletePopupComponent } from './tbl-shift-type-delete-dialog.component';

export const tblShiftTypeRoute: Routes = [
    {
        path: 'tbl-shift-type',
        component: TblShiftTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblShiftType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-shift-type/:id',
        component: TblShiftTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblShiftType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblShiftTypePopupRoute: Routes = [
    {
        path: 'tbl-shift-type-new',
        component: TblShiftTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblShiftType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-shift-type/:id/edit',
        component: TblShiftTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblShiftType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-shift-type/:id/delete',
        component: TblShiftTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblShiftType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
