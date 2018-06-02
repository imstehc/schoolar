import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblLevelTypeComponent } from './tbl-level-type.component';
import { TblLevelTypeDetailComponent } from './tbl-level-type-detail.component';
import { TblLevelTypePopupComponent } from './tbl-level-type-dialog.component';
import { TblLevelTypeDeletePopupComponent } from './tbl-level-type-delete-dialog.component';

export const tblLevelTypeRoute: Routes = [
    {
        path: 'tbl-level-type',
        component: TblLevelTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblLevelType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-level-type/:id',
        component: TblLevelTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblLevelType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblLevelTypePopupRoute: Routes = [
    {
        path: 'tbl-level-type-new',
        component: TblLevelTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblLevelType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-level-type/:id/edit',
        component: TblLevelTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblLevelType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-level-type/:id/delete',
        component: TblLevelTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblLevelType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
