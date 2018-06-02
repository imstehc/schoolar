import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TblGuardianTypeComponent } from './tbl-guardian-type.component';
import { TblGuardianTypeDetailComponent } from './tbl-guardian-type-detail.component';
import { TblGuardianTypePopupComponent } from './tbl-guardian-type-dialog.component';
import { TblGuardianTypeDeletePopupComponent } from './tbl-guardian-type-delete-dialog.component';

export const tblGuardianTypeRoute: Routes = [
    {
        path: 'tbl-guardian-type',
        component: TblGuardianTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGuardianType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tbl-guardian-type/:id',
        component: TblGuardianTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGuardianType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tblGuardianTypePopupRoute: Routes = [
    {
        path: 'tbl-guardian-type-new',
        component: TblGuardianTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGuardianType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-guardian-type/:id/edit',
        component: TblGuardianTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGuardianType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tbl-guardian-type/:id/delete',
        component: TblGuardianTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'schoolarApp.tblGuardianType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
